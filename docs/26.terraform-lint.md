## [Auto Assign Assignee Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tf-lint.yml)

This workflow automates terraform linter that checks for possible errors, best practices, etc in your terraform code Workflows have been added in `.github/workflows/tflint.yml`

#### Usage
TFLint is a framework and each feature is provided by plugins, the key features are as follows: Find possible errors (like invalid instance types) for Major Cloud providers (AWS/Azure/GCP). Warn about deprecated syntax, unused declarations. Enforce best practices, naming conventions.

#### Example
```yaml
name:  TF-Lint
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  tf-lint:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-lint.yml@master
    secrets:
      GITHUB: ${{ secrets.GITHUB }}
```
