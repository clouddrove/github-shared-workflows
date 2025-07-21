## [Terraform Checks Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tf-checks.yml)

This workflow automates terraform checks for min, max version , terraform fmt , terraform init & terraform validate in your terraform code. `.github/workflows/tf-checks.yml`

#### Usage
There are several checks you can perform to ensure the accuracy and integrity of your infrastructure provisioning process for Major Cloud providers (AWS/Azure/GCP). Warn about version, fmt and terraform validate.

#### Example
```yaml
name: tf-checks
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  tf-static-checks:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-checks.yml@master
    with:  
        working_directory: # Specify terraform code directory in repo, eg. './_example/complete/'
        terraform_version: # Specify terraform version e.g 1.3.6
        provider:          # aws
        aws_region:        # specify region eg. us-east-2
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }} 
```