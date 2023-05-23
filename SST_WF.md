## [SST Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/sst_workflow.yml)

This workflow is used to deploy serverless stack (SST) application on AWS environment. Workflows have been added in `.github/workflows/sst_workflow.yml`.

#### Usage
Below workflow can be used to deploy SST in preview environment when pull request generated and it destroys the preview environment when pull request closed, merged and labeled as destroy, similarly staging and production is deployed using there defined branches.

```yaml
name: SST Workflow

on:
  pull_request: 
    types: [closed, merged, labeled]
  workflow_dispatch:
jobs:
  preview:
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    secrets:
      AWS_ACCESS_KEY_ID: # AWS Access Key ID for preview
      AWS_SECRET_ACCESS_KEY: # AWS Secret Access Key for preview
    with:
      app-env: # preview                  
      working-directory: # specify your working folder from repo

  staging:
    if: ${{ github.base_ref == 'stage' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    secrets:
      AWS_ACCESS_KEY_ID: # AWS Access Key ID for Stage
      AWS_SECRET_ACCESS_KEY: # AWS Secret Access Key for stage
    with:
      app-env: # stage                      
      working-directory: # specify your working folder from repo

  production:
    if: ${{ github.base_ref == 'master' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    secrets:
      AWS_ACCESS_KEY_ID: # AWS Access Key ID for prod
      AWS_SECRET_ACCESS_KEY: # AWS Secret Access Key for prod
    with:
      app-env: # prod                   
      working-directory: # specify your working folder from repo
```
