## [Smurf Terraform Checks Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tf-checks.yml)

This workflow automates smurf terraform checks including format, init, validate, and optionally plan and version compatibility testing. It utilizes the workflows defined in `.github/workflows/stf-checks.yml`

### Features

- ✅ Format checking
- ✅ Terraform init and validate
- ✅ Optional terraform plan
- ✅ Optional min/max version compatibility testing
- ✅ Support for AWS, Azure, GCP, and DigitalOcean
- ✅ Configurable working directory and terraform version

### Usage

#### Basic Usage (Format, Init, Validate)

```yaml
name: Terraform Checks
on:
  push:
    branches: [ master ]
  pull_request:

jobs:
  terraform-checks:
    uses: clouddrove/github-shared-workflows/.github/workflows/stf-checks.yml@master
    with:
      working_directory: './examples/complete/'
      provider: 'azurerm'
    secrets:
      AZURE_CREDENTIALS: ${{ secrets.AZURE_CREDENTIALS }}
```

#### With smurf stf Plan

```yaml
name: Smurf Terraform Checks with Plan
on:
  push:
    branches: [ master ]

jobs:
  terraform-checks:
    uses: clouddrove/github-shared-workflows/.github/workflows/stf-checks.yml@master
    with:
      working_directory: './examples/complete/'
      provider: 'aws'
      enable_plan: true
      var_file: 'vars/dev.tfvars'
      aws_region: 'us-east-1'
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      GITHUB: ${{ secrets.GITHUB }}
      TF_API_TOKEN: ${{ secrets.TF_API_TOKEN }}
```

#### With Version Compatibility Testing

```yaml
name: Terraform Version Checks
on:
  push:
    branches: [ master ]

jobs:
  terraform-checks:
    uses: clouddrove/github-shared-workflows/.github/workflows/stf-checks.yml@master
    with:
      working_directory: './examples/complete/'
      provider: 'aws'
      enable_version_check: true
      aws_region: 'us-east-1'
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
```

### Example for smurf terraform checks with azure cloud

```yaml
name: Terraform Checks Azure
on:
  push:
    branches: [ master ]

jobs:
  terraform-checks:
    uses: clouddrove/github-shared-workflows/.github/workflows/stf-checks.yml@master
    with:
      working_directory: './examples/complete/'
      provider: 'azurerm'
      enable_plan: true
    secrets:
      AZURE_CREDENTIALS: ${{ secrets.AZURE_CREDENTIALS }}
      GITHUB: ${{ secrets.GITHUB }}
```

### Example for smurf terraform checks with aws cloud

```yaml
name: Smurf Terraform Checks AWS
on:
  push:
    branches: [ master ]

jobs:
  terraform-checks:
    uses: clouddrove/github-shared-workflows/.github/workflows/stf-checks.yml@master
    with:
      working_directory: './examples/complete/'
      provider: 'aws'
      enable_plan: true
      aws_region: 'us-east-1'
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
      GITHUB: ${{ secrets.GITHUB }}
```

### Example for smurf terraform checks with digitalocean cloud

```yaml
name: Terraform Checks DigitalOcean
on:
  push:
    branches: [ master ]

jobs:
  terraform-checks:
    uses: clouddrove/github-shared-workflows/.github/workflows/stf-checks.yml@master
    with:
      working_directory: './examples/complete/'
      provider: 'digitalocean'
    secrets:
      DIGITALOCEAN_ACCESS_TOKEN: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
      GITHUB: ${{ secrets.GITHUB }}
```

### Example for smurf terraform checks with GCP cloud

```yaml
name: Terraform Checks GCP
on:
  push:
    branches: [ master ]

jobs:
  terraform-checks:
    uses: clouddrove/github-shared-workflows/.github/workflows/stf-checks.yml@master
    with:
      working_directory: './examples/complete/'
      provider: 'gcp'
      enable_version_check: true
      project_id: 'my-gcp-project'
    secrets:
      GCP_CREDENTIALS: ${{ secrets.GCP_CREDENTIALS }}
      WORKLOAD_IDENTITY_PROVIDER: ${{ secrets.WORKLOAD_IDENTITY_PROVIDER }}
      SERVICE_ACCOUNT: ${{ secrets.SERVICE_ACCOUNT }}
```

### Input Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `working_directory` | No | `'./examples/complete/'` | Directory where terraform code exists |
| `provider` | No | `azurerm` | Cloud provider: `azurerm`, `aws`, `gcp`, or `digitalocean` |
| `aws_region` | No | `us-east-1` | AWS region for deployment |
| `var_file` | No | `""` | Terraform var file directory (e.g., `vars/dev.tfvars`) |
| `terraform_version` | No | Latest | Specific Terraform version to use |
| `enable_version_check` | No | `false` | Enable min/max version compatibility testing |
| `enable_plan` | No | `false` | Enable terraform plan step |
| `role_duration_seconds` | No | `3600` | AWS role duration in seconds (900-43200) |
| `project_id` | No | - | GCP project ID |
| `token_format` | No | `access_token` | GCP token format (`access_token` or `id_token`) |
| `access_token_lifetime` | No | `300s` | GCP access token lifetime |
| `create_credentials_file` | No | `true` | Create GCP credentials file |

### Secrets

| Secret | Required | Description |
|--------|----------|-------------|
| `AZURE_CREDENTIALS` | No | Azure credentials JSON |
| `AWS_ACCESS_KEY_ID` | No | AWS access key ID |
| `AWS_SECRET_ACCESS_KEY` | No | AWS secret access key |
| `AWS_SESSION_TOKEN` | No | AWS session token |
| `BUILD_ROLE` | No | AWS OIDC role ARN |
| `DIGITALOCEAN_ACCESS_TOKEN` | No | DigitalOcean access token |
| `GITHUB` | No | GitHub PAT token |
| `TF_API_TOKEN` | No | Terraform Cloud API token |
| `GCP_CREDENTIALS` | No | GCP service account key JSON |
| `WORKLOAD_IDENTITY_PROVIDER` | No | GCP Workload Identity Provider |
| `SERVICE_ACCOUNT` | No | GCP service account email |
