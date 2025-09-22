## [terraform drifts Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tfdrifts.yml)

This workflow automates Terraform configuration drift detection by running terraform init/plan against your live infrastructure and signaling when resources have changed outside of code. The reusable workflow is stored at `.github/workflows/tfdrifts.yml` in the shared repo.

**Key capabilities**:
- Detect drift via terraform plan.
- Works with AWS, Azure, or GCP (select with provider).

#### Example
```yaml
name:  TF-Drift
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  tf-lint:
    uses: clouddrove/github-shared-workflows/.github/workflows/tfdrift.yml@master
    with:  
      working_directory:    #'./_example/complete/'
      provider:             #aws
      aws_region:           # AWS region
    secrets:
        AWS_ACCESS_KEY_ID:  # Specify AWS Access key ID
        AWS_SECRET_ACCESS_KEY: # Specify AWS Secret Access key ID
        AWS_SESSION_TOKEN:  # Specify Session ID
```