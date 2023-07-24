## [Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/terraform_workflow.yml)

This workflow is used to apply and destroy terraform infra using GitHub Actions. It utilizes the workflows defined in `.github/workflows/helm.yml`

#### Usage
This workflow generates an issue before the apply or destroy step with a required plan in it. If we comment "yes," the workflow will proceed to the next step. However, if we comment "deny," the workflow will be canceled.

#### Example
```yaml
name: terraform workflow
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/terraform_workflow.yml@master
    with:  
        working_directory: './'
        destroy: true
```
