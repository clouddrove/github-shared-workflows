## [Clens AWS Audit Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/clens.yml)

`clens` is a lightweight Go CLI — *see your cloud clearly* — that runs AWS audit tools via the clens API and extracts results locally into `_report/` and `_logs/`.

### Usage

This workflow builds `clens` from source, runs the selected audit tool using your AWS credentials, and uploads the report as a GitHub Actions artifact. Optionally sends a Slack notification on completion.

### Available tools

| Tool | Description |
|---|---|
| `aws-inventory` | EC2, RDS, Lambda, and S3 inventory |
| `iam-audit` | IAM users, roles, and policy review |
| `cost-report` | Cost breakdown via Cost Explorer |
| `security-audit` | Security group, public access, and encryption checks |
| `unused-resources` | Identify unused EC2, EBS, and EIP resources |
| `tag-compliance` | Tag coverage and policy compliance |
| `service-quotas` | Current service quota utilisation |
| `all` | Run all tools in one request |

### Example

```yaml
name: AWS Audit

on:
  workflow_dispatch:
  schedule:
    - cron: '0 8 * * 1'  # Every Monday at 08:00 UTC

jobs:
  audit:
    name: Run clens audit
    uses: clouddrove/github-shared-workflows/.github/workflows/clens.yml@master
    with:
      tool: aws-inventory          # Required: tool name or 'all'
      api_host: 192.168.13.245     # Optional: clens API host (IP or hostname)
      retention_days: 7            # Optional: artifact retention (default: 7)
      enable_slack_notification: false
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_SESSION_TOKEN: ${{ secrets.AWS_SESSION_TOKEN }}   # Optional
      API_TOKEN: ${{ secrets.API_TOKEN }}                   # Optional
```

### Run all tools with Slack notification

```yaml
jobs:
  full-audit:
    name: Full AWS audit
    uses: clouddrove/github-shared-workflows/.github/workflows/clens.yml@master
    with:
      tool: all
      api_host: 192.168.13.245
      retention_days: 14
      enable_slack_notification: true
      slack_message: 'Weekly AWS audit complete'
      slack_env: production
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
      SLACK_USERNAME: ${{ secrets.SLACK_USERNAME }}
```

### Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `tool` | ✅ | — | Tool to run (see table above). |
| `api_host` | ❌ | `''` | Clens API host (IP or hostname, with optional port). |
| `api_run_path` | ❌ | `/aws/run` | API run path override. |
| `retention_days` | ❌ | `7` | Artifact retention period in days. |
| `enable_slack_notification` | ❌ | `false` | Send a Slack notification on completion. |
| `slack_message` | ❌ | `Clens AWS audit complete` | Slack message body. |
| `slack_env` | ❌ | `''` | Environment label in the Slack notification. |

### Secrets

| Secret | Required | Description |
|---|---|---|
| `AWS_ACCESS_KEY_ID` | ✅ | AWS access key ID. |
| `AWS_SECRET_ACCESS_KEY` | ✅ | AWS secret access key. |
| `AWS_SESSION_TOKEN` | ❌ | AWS session token (for temporary credentials). |
| `API_TOKEN` | ❌ | API auth token sent as `X-API-Key`. |
| `SLACK_WEBHOOK` | ❌ | Slack webhook URL. |
| `SLACK_USERNAME` | ❌ | Slack username for the notification. |

It uses Clouddrove Github-Shared-Workflow. [HERE](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/clens.yml)
