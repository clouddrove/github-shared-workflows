## [Smurf Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/smurf_terraform.yml)

This workflow is used to work with Terraform using Smurf. It utilizes the workflows defined in `.github/workflows/smurf_terraform.yml`

#### Usage
The following workflow can work with Terraform Using Smurf. It can Format, Init, Validate, Plan, Apply and Destroy Infrastructure. 

#### Example for Smurf Terraform

```yaml
name: Smurf Terraform
on:
  push:

jobs:
  dev:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf_terraform.yml@master
    with:
      terraform_directory: # Terraform Directory
    secrets:
      AWS_ROLE_TO_ASSUME: ${{ secrets.AWS_ROLE_TO_ASSUME }}
```