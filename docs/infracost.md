## [Infra-Cost Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/infracost.yml)
Infracost shows cloud cost estimates for Terraform. It lets engineers see a cost breakdown and understand costs before making changes, either in the terminal,VS Code or pull requests.
It utilizes the workflows defined in `.github/workflows/infracost.yml`

#### Usage
- With Terraform, you can easily estimate cloud costs by leveraging Infracost, and you can easily compare potential bills between different vendors. Infracost, as they state on their website, makes you love your cloud bill
- When you create PR we show the difference of cost in a PR comment, and the actual cost report generated in artifactory

#### Get started
Infracost also has many CI/CD integrations so you can easily post cost estimates in pull requests. This provides your team with a safety net as people can discuss costs as part of the workflow.

First you need to generate **INFRACOST-API-KEY** using following commands on your CLI.
```
brew install infracost
infracost --version
infracost auth login   # signup here
infracost configure get api_key  # here we got API-KEY copy this & add in github 

```
**Infra-cost Api generation Reference Link:** https://www.infracost.io/docs/

#### Example

```yaml
name: "Infracost analysis"
permissions: write-all

on:
  pull_request:
     branches: [ master ]
jobs:
  infracost:
    uses: clouddrove/github-shared-workflows/.github/workflows/infracost.yml@master
    with:
      working-directory:   # Need to specify working-directory as that's where the terraform files live in the source code
    secrets:
      INFRACOST_API_KEY:   # Provide Infra-Cost-API-key
      GITHUB: # Add github token here
```

## When you do some changes in resources, after that create Pull Request in this we shows difference between previous cost & new cost
Show below picture for more understanding

![image](https://github.com/clouddrove-sandbox/Infra-cost/assets/116706588/4de7eb51-57a2-4165-8332-fea4a9c5311d)

## For Slack Notification

```
       - name: Generate Slack message
         id: infracost-slack
         run: |
           echo "::set-output name=slack-message::$(infracost output --path=/tmp/infracost.json --format=slack-message --show-skipped)"
           echo "::set-output name=diffTotalMonthlyCost::$(jq '(.diffTotalMonthlyCost // 0) | tonumber' /tmp/infracost.json)"

       - name: Send cost estimate to Slack
         uses: slackapi/slack-github-action@v1
         if: ${{ steps.infracost-slack.outputs.diffTotalMonthlyCost > 0 }} # Only post to Slack if there is a cost diff
         with:
           payload: ${{ steps.infracost-slack.outputs.slack-message }}
         env:
           SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK}}
           SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK
```
## Inputs
- `SLACK_WEBHOOK_URL` (required). URL of Slack incoming webhook.
- `payload` (required). For send output of generated slack report
