## [Readme Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/readme.yml)

This workflow is used to generate readme for TErraform modules using GitHub Actions. It utilizes the workflows defined in `.github/workflows/readme.yml`

#### Example of a readme workflow
```yaml
name: readme workflow
on:
  push:
    branches:
      - master
    paths-ignore:
      - 'README.md'
  workflow_dispatch:
jobs:
  assignee:
    uses: clouddrove/github-shared-workflows/.github/workflows/readme.yml@master
    secrets:
      TOKEN :                  # Provide GitHub token 
      SLACK_WEBHOOK_TERRAFORM: # Provide slack-webhook url
```
