## [Smurf Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tf-smurf.yml)

Reusable workflow for Terraform plan, apply, and destroy using [Smurf STF](https://github.com/clouddrove/smurf) (`smurf stf`).

**Shared workflow:** `.github/workflows/tf-smurf.yml`  
**Caller workflow:** lives in your application repo and calls the shared workflow via `workflow_call`.

### Architecture

```
Your repo (caller)                    github-shared-workflows (shared)
─────────────────                   ─────────────────────────────────
.github/workflows/
  tf-caller.yml      ──uses──►  .github/workflows/tf-smurf.yml
                                      │
                                      ├── job: terraform-execution  (run_create)
                                      │     fmt → init → validate → plan → [approval] → apply
                                      │
                                      └── job: terraform-destroy    (run_destroy)
                                            init → [azure import] → [approval] → destroy
```

**Rule:** One caller **job** invokes one shared workflow. Control apply vs destroy with boolean inputs `run_create` and `run_destroy`.

### What it does

**Create path (`run_create: true`):**

1. Cloud authentication (AWS, Azure, GCP, or DigitalOcean)
2. `smurf stf fmt` → `init` → `validate` → `plan` → optional manual approval → `apply`

**Destroy path (`run_destroy: true`):**

1. Re-authenticate and `init`
2. Azure: optional import of orphaned resource group into state
3. Optional manual approval → `smurf stf destroy`

When both flags are set in one run, destroy runs after create completes successfully.

### Required repository setup

1. Terraform root directory committed (e.g. `./terraform/` or `./examples/complete/`).
2. Optional var file path relative to `terraform_directory` (e.g. `vars/dev.tfvars`).
3. Cloud credentials stored as repository or environment secrets.
4. For manual approval: set `approvers` to GitHub usernames (comma-separated) unless `auto_approve: true`.

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `terraform_directory` | string | **required** | Terraform root directory |
| `provider` | string | **required** | `aws`, `azurerm`, `gcp`, or `digitalocean` |
| `run_create` | boolean | `false` | Run plan/apply job |
| `run_destroy` | boolean | `false` | Run destroy job |
| `var_file` | string | — | Var file path relative to `terraform_directory` |
| `plan_only` | boolean | `false` | Plan only — skip apply |
| `plan_out` | string | `tfplan` | Plan filename inside `terraform_directory` |
| `auto_approve` | boolean | `false` | Skip manual approval steps |
| `approvers` | string | — | GitHub usernames for approval |
| `minimum-approvals` | string | `1` | Minimum approvers required |
| `timeout` | number | `10` | Approval timeout (minutes) |
| `target_environment` | string | `""` | GitHub Environment for gates |
| `terraform_version` | string | `1.3.6` | Terraform CLI version |
| `smurf_version` | string | `v1.1.5` | Smurf CLI version |
| `aws_region` | string | `us-east-2` | AWS region |
| `project_id` | string | — | GCP project ID |
| `git_ssh_key_setup` | boolean | `false` | Enable SSH agent for private module clones |
| `create_credentials_file` | string | `true` | GCP credentials file generation |
| `token_format` | string | `access_token` | GCP token format |
| `access_token_lifetime` | string | `300s` | GCP token lifetime |

### Secrets

| Secret | Required when | Description |
|--------|---------------|-------------|
| `AZURE_CREDENTIALS` | Azure | Service principal JSON (`clientId`, `clientSecret`, `tenantId`, `subscriptionId`) |
| `BUILD_ROLE` | AWS OIDC | IAM role ARN |
| `AWS_ACCESS_KEY_ID` | AWS keys | Static access key |
| `AWS_SECRET_ACCESS_KEY` | AWS keys | Static secret key |
| `AWS_SESSION_TOKEN` | AWS keys | Optional session token |
| `GCP_CREDENTIALS` | GCP JSON | Service account key |
| `WORKLOAD_IDENTITY_PROVIDER` | GCP WIP | Workload Identity Provider |
| `SERVICE_ACCOUNT` | GCP WIP | Service account email |
| `DIGITALOCEAN_ACCESS_TOKEN` | DigitalOcean | API token |
| `env-vars` | Optional | Multiline env vars injected into `$GITHUB_ENV` |
| `SSH_PRIVATE_KEY` | Private modules | SSH key when `git_ssh_key_setup: true` |

Azure credentials are also exported as `ARM_*` environment variables automatically.

---

### Example: AWS apply (manual dispatch)

```yaml
name: Smurf Terraform — AWS Apply

on:
  workflow_dispatch:
    inputs:
      apply:
        description: Run plan and apply
        type: boolean
        default: true

permissions:
  id-token: write
  contents: read

jobs:
  terraform-apply:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-smurf.yml@v2
    with:
      terraform_directory: ./terraform
      provider: aws
      run_create: ${{ github.event.inputs.apply }}
      run_destroy: false
      var_file: vars/dev.tfvars
      aws_region: us-east-1
      approvers: your-github-username
      auto_approve: false
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
```

---

### Example: AWS destroy only

```yaml
name: Smurf Terraform — AWS Destroy

on:
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  terraform-destroy:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-smurf.yml@v2
    with:
      terraform_directory: ./terraform
      provider: aws
      run_create: false
      run_destroy: true
      var_file: vars/dev.tfvars
      aws_region: us-east-1
      approvers: your-github-username
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
```

---

### Example: Azure apply + optional destroy

```yaml
name: Smurf Terraform — Azure

on:
  workflow_dispatch:
    inputs:
      run_apply:
        description: Plan and apply
        type: boolean
        default: true
      run_destroy:
        description: Destroy infrastructure
        type: boolean
        default: false

permissions:
  id-token: write
  contents: read

jobs:
  terraform:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-smurf.yml@v2
    with:
      terraform_directory: ./examples/complete
      provider: azurerm
      run_create: ${{ github.event.inputs.run_apply }}
      run_destroy: ${{ github.event.inputs.run_destroy }}
      var_file: vars/dev.tfvars
      approvers: your-github-username
      auto_approve: false
    secrets:
      AZURE_CREDENTIALS: ${{ secrets.AZURE_CREDENTIALS }}
```

The destroy job includes an Azure-specific step that imports an existing resource group into state when state is empty but the group already exists in Azure (resource address: `azurerm_resource_group.test`).

---

### Example: GCP with Workload Identity

```yaml
name: Smurf Terraform — GCP

on:
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  terraform-apply:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-smurf.yml@v2
    with:
      terraform_directory: ./terraform
      provider: gcp
      run_create: true
      run_destroy: false
      project_id: my-gcp-project
      var_file: vars/prod.tfvars
      approvers: your-github-username
    secrets:
      WORKLOAD_IDENTITY_PROVIDER: ${{ secrets.WORKLOAD_IDENTITY_PROVIDER }}
      SERVICE_ACCOUNT: ${{ secrets.SERVICE_ACCOUNT }}
```

---

### Example: Plan only (no apply)

```yaml
jobs:
  terraform-plan:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-smurf.yml@v2
    with:
      terraform_directory: ./terraform
      provider: aws
      run_create: true
      plan_only: true
      var_file: vars/dev.tfvars
      aws_region: us-east-1
      auto_approve: true
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
```

---

### Example: DigitalOcean

```yaml
name: Smurf Terraform — DigitalOcean

on:
  workflow_dispatch:

jobs:
  terraform:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-smurf.yml@v2
    with:
      terraform_directory: ./terraform
      provider: digitalocean
      run_create: true
      var_file: vars/dev.tfvars
      approvers: your-github-username
    secrets:
      DIGITALOCEAN_ACCESS_TOKEN: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
```

---

### Example: Private Terraform modules (SSH)

```yaml
jobs:
  terraform:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-smurf.yml@v2
    with:
      terraform_directory: ./terraform
      provider: aws
      run_create: true
      git_ssh_key_setup: true
      aws_region: us-east-1
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
      SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
      env-vars: |
        TF_VAR_example=production
```

---

### Job flow reference

| `run_create` | `run_destroy` | Jobs that run |
|--------------|---------------|---------------|
| `true` | `false` | `terraform-execution` only |
| `false` | `true` | `terraform-destroy` only |
| `true` | `true` | `terraform-execution` then `terraform-destroy` (if apply succeeds) |
| `false` | `false` | Nothing runs |

### Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Apply blocked | Manual approval | Approve the issue created by `trstringer/manual-approval`, or set `auto_approve: true` |
| Azure destroy fails on missing state | Resource exists outside state | Destroy job attempts RG import — ensure var file has `resource_group_name` and resource address matches `azurerm_resource_group.test` |
| Plan file not found on apply | Wrong `plan_out` | Keep default `tfplan` or ensure plan and apply use the same filename |
| GCP auth fails | Missing WIP or JSON key | Pass `GCP_CREDENTIALS` or WIP + service account secrets |
| Destroy skipped after failed apply | By design | Fix apply first; destroy only runs when `run_create` is false or apply succeeded |
| ARM_* not set | Bad Azure JSON secret | `AZURE_CREDENTIALS` must be valid JSON with all four fields |
