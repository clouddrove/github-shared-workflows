# smurf-workflows

Reusable GitHub Actions workflows for [Smurf STF](https://github.com/clouddrove/smurf) Terraform drift detection.

## Shared workflow

| File | Description |
|------|-------------|
| [.github/workflows/smurf-tf-drift.yml](.github/workflows/smurf-tf-drift.yml) | Reusable drift detection workflow (`workflow_call`) |

### What it does

1. Authenticates to AWS or GCP
2. Runs `smurf stf init` → `validate` → `plan`
3. Detects drift when the plan file is non-empty
4. Uploads the plan artifact and publishes a job summary
5. Opens or updates a GitHub issue on drift; closes it when clean
6. Fails the job when drift is detected

### Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `terraform_directory` | Yes | — | Terraform root directory |
| `provider` | Yes | — | `aws` or `gcp` |
| `var_file` | No | `""` | Var file path relative to `terraform_directory` |
| `backend_config` | No | `""` | Backend config path relative to `terraform_directory` |
| `aws_region` | No | `us-east-1` | AWS region |
| `terraform_version` | No | `1.5.7` | Terraform version |
| `smurf_version` | No | `v1.1.6` | Smurf CLI version |
| `plan_out` | No | `tfplan` | Plan output filename |
| `create_issue` | No | `true` | Open/update drift issue |
| `close_issue_on_clean` | No | `true` | Close drift issue when no drift |
| `drift_issue_title` | No | `Terraform Configuration Drift Detected` | Issue title |
| `project_id` | No | `""` | GCP project ID |

### Secrets

| Secret | Provider | Description |
|--------|----------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS | Access key (static auth) |
| `AWS_SECRET_ACCESS_KEY` | AWS | Secret key (static auth) |
| `AWS_SESSION_TOKEN` | AWS | Session token (optional) |
| `BUILD_ROLE` | AWS | IAM role ARN (OIDC auth) |
| `GCP_CREDENTIALS` | GCP | Service account JSON |
| `WORKLOAD_IDENTITY_PROVIDER` | GCP | Workload Identity Provider |
| `SERVICE_ACCOUNT` | GCP | GCP service account email |
| `env-vars` | Any | Extra env vars appended to `GITHUB_ENV` |

### Exit behavior

| Result | Job outcome |
|--------|-------------|
| No plan changes | Pass |
| Update/replace/destroy in plan | Fail + drift issue |
| Create-only plan (no state yet) | Fail with bootstrap message |
| Init/validate/plan error | Fail |

---

### AWS drift caller (sample)

Calls the shared workflow from the same repository:

```yaml
permissions:
  contents: read
  issues: write
  id-token: write

jobs:
  drift-aws:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-tf-drift.yml@v2
    with:
      terraform_directory: shared
      provider: aws
      var_file: vars/shared.tfvars
      backend_config: vars/backend.hcl
      aws_region: us-east-1
      smurf_version: v1.1.6
      plan_out: drift.plan
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_SESSION_TOKEN: ${{ secrets.AWS_SESSION_TOKEN }}
```

Triggers: `workflow_dispatch`, daily schedule, and PRs touching `shared/**` or drift workflows.

### AWS bootstrap caller (sample)

Standalone workflow — runs `smurf stf apply` once so remote state exists before drift checks:

```yaml
jobs:
  bootstrap-aws:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.BUILD_ROLE }}
          aws-region: us-east-1
      - uses: clouddrove/smurf@v1.1.6
      - run: smurf stf init --dir=shared --backend-config=shared/vars/backend.hcl
      - run: smurf stf apply --dir=shared --var-file=vars/shared.tfvars --auto-approve
```

Run bootstrap once, then use the drift caller.

### GCP caller (sample)

```yaml
jobs:
  drift-gcp:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-tf-drift.yml@v2
    with:
      terraform_directory: terraform
      provider: gcp
      var_file: vars/dev.tfvars
      project_id: ${{ vars.GCP_PROJECT_ID }}
    secrets:
      WORKLOAD_IDENTITY_PROVIDER: ${{ secrets.WORKLOAD_IDENTITY_PROVIDER }}
      SERVICE_ACCOUNT: ${{ secrets.SERVICE_ACCOUNT }}
      GCP_CREDENTIALS: ${{ secrets.GCP_CREDENTIALS }}
```

---

## Use from another repository

```yaml
permissions:
  contents: read
  issues: write
  id-token: write

jobs:
  drift:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-tf-drift.yml@v2
    with:
      terraform_directory: infrastructure/terraform
      provider: aws
      var_file: vars/prod.tfvars
      backend_config: vars/backend.hcl
      aws_region: us-east-1
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```
