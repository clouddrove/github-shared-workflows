## [Terragrunt Drift Detection Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tf-terragrunt-drift.yml)

This workflow automates **Terraform/Terragrunt infrastructure drift detection** by running a read-only `terragrunt plan` against the live infrastructure and identifying resources that have changed outside of the Terraform configuration.

The reusable workflow is stored at `.github/workflows/tf-terragrunt-drift.yml` in the shared workflows repository.

### Key capabilities

- Detect infrastructure drift using `terragrunt plan`.
- Supports **AWS, Azure, and GCP**.
- Select the cloud provider using the `provider` input.
- Supports reusable workflow execution through `workflow_call`.
- Reports drifted and errored Terragrunt units.
- Provides workflow status:
  - `clean` — no drift detected.
  - `drift` — infrastructure drift detected.
  - `error` — Terraform/Terragrunt execution failed.
- Publishes a detailed GitHub Actions step summary.
- Sends a Slack notification when drift or an error is detected.
- Uses `-lock=false`, so the drift check does not acquire the Terraform state lock.

### Example

```yaml
name: TF-Drift

on:
  push:
    branches:
      - master
      - main
  pull_request:
  workflow_dispatch:

permissions:
  contents: read
  id-token: write

jobs:
  drift:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-terragrunt-drift.yml@v2

    with:
      working_directory: live/dev
      env_name: dev
      provider: gcp
      terraform_version: "1.14.9"
      terragrunt_version: "1.1.0"

    secrets:
      GCP_PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
      GCP_CREDENTIALS: ${{ secrets.GCP_SA_KEY }}
      SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```      