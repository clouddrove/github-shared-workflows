## [Smurf Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tf-smurf.yml)

This workflow is used to work with Terraform using Smurf. It utilizes the workflows defined in `.github/workflows/tf-smurf.yml`

#### Usage
The following workflow can work with Terraform Using Smurf. It can Format, Init, Validate, Plan, Apply and Destroy Infrastructure.

#### Example for Smurf Terraform

```yaml
name: Smurf Terraform
on:
  push:

jobs:
  dev:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-smurf.yml@2.0.0
    with:
      terraform_directory: # Terraform Directory
      aws_auth_method: # AWS auth method to use like oidc and keys
      aws_role: # AWS role
      aws_region: # AWS region
      approvers: # Approvals list to approve apply or destroy
    secrets:
        AWS_ACCESS_KEY_ID:  # Specify AWS Access key ID
        AWS_SECRET_ACCESS_KEY: # Specify AWS Secret Access key ID
        AWS_SESSION_TOKEN:  # Specify Session ID
```
