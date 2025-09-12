## [Prowler Workflow GCP](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/prowlerGCP.yml)
Prowler an open cloud security platform for our cloud environment. We get a complete report of our cloud infra.

### Usage
This workflow is used to run a Prowler scan on your GCP cloud infrastructure. You can choose to upload the scan reports to a GCS bucket, or disable that option — in which case, the reports will be available as downloadable GitHub Artifacts at the end of the workflow.

The workflow supports scanning multiple GCP projects by providing a comma-separated list of project IDs. You can also enable Slack notifications to receive updates when the workflow completes. For authentication, it supports both GCP Service Account Key JSON and Workload Identity Federation (WIF), giving you flexibility based on your security setup.

### Example for GCP cloud provider
```yaml
name: 'Prowler GCP Scan'

on:
  workflow_dispatch:

jobs:
  prowler-security:
    uses: clouddrove/github-shared-workflows/.github/workflows/prowlerGCP.yml@master
    with:
      cloud_provider: 'gcp'
      gcp_project_ids: 'project-1,project-2'  # Comma-separated GCP project IDs to scan
      access_token_lifetime: 300             # Access token validity duration in seconds
      retention_days: 2                      # Number of days to retain scan reports as artifacts
      enable_gcs_upload: true                # Set true to upload reports to GCS bucket
      enable_slack_notification: true        # Set true to enable Slack notifications
      SLACK_MESSAGE: 'GCP Prowler Scan Complete'  # Message to display in Slack
      SLACK_ENV: 'Production'                # Environment label shown in Slack (e.g., Dev, QA, Prod)
      enable_gcp_key_auth: false            # Set true to use GCP_KEY (Service Account JSON); false for WIF auth
    secrets:
      WIP: ${{ secrets.WIP }}                         # Workload Identity Provider (used for WIF-based auth)
      SERVICE_ACCOUNT: ${{ secrets.SERVICE_ACCOUNT }} # GCP Service Account email used for authentication
      GCS_BUCKET_NAME: ${{ secrets.GCS_BUCKET_NAME }} # GCS bucket name to upload Prowler reports
      SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}     # Slack webhook URL to send notifications
      SLACK_USERNAME: ${{ secrets.SLACK_USERNAME }}   # Username shown in Slack notifications
      GCP_KEY: ${{ secrets.GCP_KEY }}                 # Optional: GCP Service Account Key JSON, used if key-based auth is enabled

```

It uses Clouddrove Github-Shared-Workflow. [HERE](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/prowlerGCP.yml)
