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
        working_directory: './_example/complete/'
        # terraform_version: 0.12.31 // Specify the Terraform version to use. Uncomment and provide your desired version, or leave it as is to use the latest version.
        aws_credentials: false // Provide your AWS Credentails ID here if 'aws_credentials' is set to 'true'.
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }} 
```