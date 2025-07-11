
---

## [Terraform plan PR Diff Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tf-pr-checks.yml)

This workflow automatically run a terraform plan command for the PR and for the master and generate a comparison between them. It utilizes the workflows defined in `.github/workflows/tf-pr-checks.yaml`.

### Features
- Make it easy to decide the new tag version.
- Compare the terraform plan from PR created and from Master branch
- Add as much as directory to make a comparison.

### Usage
This workflow triggers automatically on PR creation and generate a comparison of the terraform plan between the PR and Master

#### Example Implementation
```yaml
name: Terraform Plan PR Diff
on:
  pull_request:
    branches:
      - master
    paths:
      - 'examples/complete/**'

jobs:
  complete-example:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-pr-checks.yaml@tf-master
    with:
      provider: 'azurerm'
      terraform_directory: 'examples/complete'
      target_branch: 'master'
    secrets:
      AZURE_CREDENTIALS: ${{ secrets.AZURE_CREDENTIALS }}
      ARM_SUBSCRIPTION_ID: ${{ secrets.ARM_SUBSCRIPTION_ID }}
```
