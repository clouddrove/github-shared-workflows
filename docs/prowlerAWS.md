## [Prowler Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/prowlerAWS.yml)
Prowler an open cloud security platform for our cloud environment. We get a complete report of our cloud infra.

### Usage
This workflow is used to run Prowler scan on your cloud infra for AWS. In the Workflow you can choose to send your report to your S3 Bucket or you can also disable that and at the end of the workflow you will get a Artifact which you can download. You can also enable the feature of Security Hub which will send the findings into your account. It also supports Multi-AWS account.

### Example for AWS cloud provider

```yaml
name: 'Running Prowler'

on:
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  aws-assessment:
    name: Run prowler security
    # uses: clouddrove/github-shared-workflows/.github/workflows/prowler.yml@master
    uses: clouddrove-sandbox/test-shared-workflow/.github/workflows/prowler.yml@master
    with:
      cloud_provider: 'aws'
      aws_region: ## aws region
      role_duration_seconds: 900
      retention_period: ## retention period of reports
      SLACK_MESSAGE: ## Message to display in Slack Notification
      SLACK_ENV: ## Workflow Environment to display in Slack Notification
      enable_s3_upload: true ## to upload reports into your S3 Bucket
      enable_slack_notification: false ## to get the notification on slack for successfull running the workflow 
      send_to_securityhub: ## Enable this to get the findings in your security hub
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}   ## OIDC Role
      PROWLER_ROLE_NAME: ${{ secrets.PROWLER_ROLE_NAME }}    ## Prowler Role
      TARGET_ACCOUNT_ID: ${{ secrets.TARGET_ACCOUNT_ID }}
      S3_BUCKET_NAME: ${{ secrets.S3_BUCKET_NAME }}
      SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
      SLACK_USERNAME: ${{ secrets.SLACK_USERNAME }}
```

It uses Clouddrove Github-Shared-Workflow. [HERE](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/prowlerAWS.yml)