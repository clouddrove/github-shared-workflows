## [Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tf-workflow.yml)

This workflow is used to apply and destroy terraform infra using GitHub Actions. It supports both full infrastructure deployments and targeted resource operations. It utilizes the workflows defined in `.github/workflows/tf-workflow.yml`

### Features

- ✅ Full infrastructure deployment
- ✅ Targeted resource operations (`--target` flag)
- ✅ Plan-only mode
- ✅ Manual approval workflow
- ✅ PR comment integration (for non-targeted plans)
- ✅ Plan artifact upload (for targeted plans)
- ✅ Support for AWS, Azure, GCP, and DigitalOcean

#### Usage
This workflow generates an issue before the apply or destroy step with a required plan in it. If we comment "yes", "lgtm" the workflow will proceed to the next step. However, if we comment "deny," the workflow will be canceled.

### Targeting Resources

You can target specific Terraform resources using:
- `target` input: Direct resource address (e.g., `module.vpc_ec2`)
- `target_file` input: Path to file containing target resource
- `target.txt` file: Fallback file in working directory

When targeting is used, the workflow will:
- Use custom plan logic with `--target` flag
- Upload plan as artifact
- Apply/destroy only the targeted resources

#### Example of a Terraform workflow for a AWS cloud provider
```yaml
name: terraform workflow
permissions: write-all
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-workflow.yml@master
    with:
        provider:           # aws
        working_directory:  # Specify terraform code directory in repo, eg. './_example/complete/'
        var_file:           # name of tfvar file, eg. "variable.tfvar"
        aws_region:         # specify region eg. us-east-2
        approvers:          # Assignee name for approve apply or destroy step
        minimum-approvals:  # Minimum number of approvals required to progress the workflow, deafault value is 1
        terraform_version:  # Specify terraform version e.g 1.3.6
        plan_only:          # If the value is set to true, the workflow will only show terraform plan
        destroy:            # If the value is set to true, the workflow proceeds to the destroy step. However, the default value is false
     secrets:
        AWS_ACCESS_KEY_ID:  # Specify AWS Access key ID
        AWS_SECRET_ACCESS_KEY: # Specify AWS Secret Access key ID
        AWS_SESSION_TOKEN:  # Specify Session ID
        env-vars: |         # Specify env variables in following format
               key1=value1
               key2=value2

```

#### Example of a Terraform workflow for a Azure cloud provider
```yaml
name: terraform workflow
permissions: write-all
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-workflow.yml@master
    with:
        provider:           # azurerm
        working_directory:  # Specify terraform code directory in repo
        var_file:           # Name of tfvar file e.g "variable.tfvar"
        approvers:          # Assignee name for approve apply or destroy step
        minimum-approvals:  # Minimum number of approvals required to progress the workflow, deafault value is 1
        terraform_version:  # Specify terraform version e.g 1.3.6
        destroy:            # If the value is set to true, the workflow proceeds to the destroy step. However, the default value is false
     secrets:
        AZURE_CREDENTIALS:  # Specify Azure credentilas
        env-vars: |         # Specify env variables in following format
               key1=value1
               key2=value2
```

#### Example of a Terraform workflow for a Digitalocean cloud provider
```yaml
name: terraform workflow
permissions: write-all
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-workflow.yml@master
    with:
        provider:           # digitalocean
        working_directory:  # Specify terraform code directory in repo
        var_file:           # Name of tfvar file e.g "variable.tfvar"
        approvers:          # Assignee name for approve apply or destroy step
        minimum-approvals:  # Minimum number of approvals required to progress the workflow, deafault value is 1
        terraform_version:  # Specify terraform version e.g 1.3.6
        destroy:            # If the value is set to true, the workflow proceeds to the destroy step. However, the default value is false
     secrets:
      DIGITALOCEAN_ACCESS_TOKEN:       # Digitalocean token
      env-vars: |                      # Specify env variables in following format
             key1=value1
             key2=value2
```

#### Example of a Terraform workflow for a GCP cloud provider
```yaml
name: terraform workflow
permissions: write-all
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-workflow.yml@master
    with:
        provider:           # gcp
        working_directory:  # Specify terraform code directory in repo
        var_file:           # Name of tfvar file e.g "variable.tfvar"
        approvers:          # Assignee name for approve apply or destroy step
        minimum-approvals:  # Minimum number of approvals required to progress the workflow, deafault value is 1
        terraform_version:  # Specify terraform version e.g 1.3.6
        destroy:            # If the value is set to true, the workflow proceeds to the destroy step. However, the default value is false
     secrets:
      GCP_CREDENTIALS:      # The Google Cloud JSON service account key to use for authentication
      env-vars: |           # Specify env variables in following format
             key1=value1
             key2=value2
```

#### Example of a Terraform workflow with targeted resources

```yaml
name: terraform workflow targeted
permissions: write-all
on:
  push:
    branches: [ master ]
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-workflow.yml@master
    with:
        provider:           # aws
        working_directory:  # Specify terraform code directory in repo
        target:             # Target specific resource (e.g., "module.vpc_ec2")
        # OR use target_file instead:
        # target_file:       # Path to file with target (e.g., "vars/target.txt")
        var_file:           # Name of tfvar file e.g "variable.tfvar"
        aws_region:         # specify region eg. us-east-2
        approvers:          # Assignee name for approve apply or destroy step
        minimum-approvals:  # Minimum number of approvals required
        terraform_version:  # Specify terraform version e.g 1.3.6
        plan_only:          # Set to true to only run plan
        destroy:            # Set to true to destroy targeted resources
     secrets:
        AWS_ACCESS_KEY_ID:  # Specify AWS Access key ID
        AWS_SECRET_ACCESS_KEY: # Specify AWS Secret Access key ID
        BUILD_ROLE:         # AWS OIDC role
        env-vars: |         # Specify env variables
               key1=value1
               key2=value2
```

### Input Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `working_directory` | Yes | - | Root directory of terraform code |
| `provider` | Yes | - | Cloud provider: `azurerm`, `aws`, `gcp`, or `digitalocean` |
| `target` | No | - | Target specific Terraform resource (e.g., `module.vpc_ec2`) |
| `target_file` | No | - | Path to file with target resource (e.g., `vars/target.txt`) |
| `var_file` | No | - | Terraform var file directory |
| `destroy` | No | `false` | Set true to destroy infrastructure |
| `plan_only` | No | `false` | Set true to run plan only |
| `approvers` | No | - | Comma-separated list of approvers |
| `minimum-approvals` | No | `1` | Minimum approvals required |
| `terraform_version` | No | `1.3.6` | Terraform version to use |
| `timeout` | No | `10` | Approval timeout in minutes |
| `aws_region` | No | `us-east-2` | AWS region |
| `target_environment` | No | - | Deployment environment name |
| `git_ssh_key_setup` | No | `false` | Enable SSH key setup for private repos |