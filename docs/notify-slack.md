## Slack Notification Workflow

#### [Slack alert workflow reference](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/notify-slack.yml)

#### Overview

This reusable Slack notification workflow provides standardized alerting for GitHub Actions jobs, especially designed to notify about github workflow operations such as who triggered the workflow & is it successfully created or failed.

It supports sending messages to Slack channels or users using the Slack API with rich formatting, interactive buttons, and customizable fields.

#### Usage

You can integrate this workflow into your own GitHub Actions by calling it via the uses: directive. This workflow simplifies sending Slack notifications by handling authentication, message formatting, and error handling for you.

Example: Notify on EKS Cluster Spin-up



```yaml
name: 'Slack Alert'
permissions: write-all

on:
  workflow_dispatch:

jobs:
  notify-job-status:
    needs: test # Job name for which you wnat the stauus of that like is it completed or failed.
    uses: clouddrove/github-shared-workflows/.github/workflows/notify-slack.yml@master
    with:
      channel: C077NBXAZBP   # Slack id of channel where you want alerts to be setup so update this as per your channel-id
      title: "Workflow Run"  # Title of alert like for which job its give the status as success or failed ex- terraform apply  if workflow runs it gives status as terraform apply - success 
      status: ${{ needs.test.result }}  # specify the job name to check the status of job wheather its failed or completed.
      fields_json: |
        [
          {"label":"Cluster","value":"My-cluster-name"},
          {"label":"Account","value":"Account-name"},
          {"label":"Region","value":"Region"}
        ]
      body_md: |
        Cluster is up   # Its the message you need to specify like for whatever task you have added alerts is it completed or not so update it accordingly.
      button_text: "Open Run"   # Its the button for link of your workflow run 
      button_url: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
      logo_url: "https://clouddrove.com/logo.png"  
      brand: "CloudDrove"
    secrets:
      SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}  # Your Bot User OAuth Token 
```
