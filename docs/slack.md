Slack Notification Workflow

Overview

This reusable Slack notification workflow provides standardized alerting for GitHub Actions jobs, especially designed to notify about github workflow operations such as who triggered the workflow & is it successfully created or failed.

It supports sending messages to Slack channels or users using the Slack API with rich formatting, interactive buttons, and customizable fields.

Usage

You can integrate this workflow into your own GitHub Actions by calling it via the uses: directive. This workflow simplifies sending Slack notifications by handling authentication, message formatting, and error handling for you.

Example: Notify on EKS Cluster Spin-up



```
name: 'EKS Sandkube'
permissions: write-all

on:
  schedule:
    - cron: '30 20 * * 1-5' # 02:00 AM IST
  workflow_dispatch:
    inputs:
      up_or_down:
        description: 'Create or Delete EKS cluster'
        required: true
        default: 'Up'
        type: choice
        options:
          - Up
          - Down
      eks_version:
        description: 'Version of EKS Cluster.'
        type: string
        required: false
        default: '1.32'


jobs:
  spin-up:
    if: github.event_name == 'workflow_dispatch' && github.event.inputs.up_or_down == 'Up'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::924144197303:role/automated-eks-cluster-assume-role
          role-session-name: sandkube
          aws-region: us-east-1

      - uses: hashicorp/setup-terraform@v2
        with:
          terraform_wrapper: false
          terraform_version: 1.5.7

      - working-directory: terraform/aws/eks
        run: terraform init

      - working-directory: terraform/aws/eks
        run: terraform apply -var eks_version=${{ github.event.inputs.eks_version }} --auto-approve


  notify-spin-up:
    if: always() && github.event_name == 'workflow_dispatch' && github.event.inputs.up_or_down == 'Up'
    needs: spin-up
    uses: clouddrove/github-shared-workflows/.github/workflows/slack.yml@fix/slack-alert-via-token
    with:
      channel: C077NBXAZBP   # Slack id of channel where you want alerts to be setup
      title: "EKS Cluster Spin-up"
      status: ${{ needs.spin-up.result }}
      fields_json: |
        [
          {"label":"Cluster","value":"sandkube-eks-cluster"},
          {"label":"Account","value":"TEST-ACCOUNT"},
          {"label":"Region","value":"us-east-1"}
        ]
      body_md: |
        *Kubeconfig:*
        ```
        aws eks update-kubeconfig --name sandkube-eks-test-cluster --region us-east-1
        ```
      button_text: "Open Run"
      button_url: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
      logo_url: "https://clouddrove.com/logo.png"
      brand: "CloudDrove"
    secrets:
      SLACK_BOT_TOKEN: ${{ secrets.TEST_SLACK_BOT_TOKEN }}
```
