<h1 align="center">github-shared-workflows</h1>

## SST Workflow

This workflow is used to deploy serverless application on AWS environment where

first job called as SST workflow which deploys in preview environment when pull request generated and it destroys the preview environment when pull request closed, merged and labeled as destroy. 

Second job is called as SST workflow which deploy stage environment when pull request merged in base branch stage and after that preview environment also destroy.

Third job is called SST workflow which deploy prod environment when pull request merged in base branch master and after that preview environment also destroy. 

---

Caller repositories can checkout the shared actions and call them locally by providing the sst_workflow.yml path

```yaml
name: Reusable SST Workflow

on:
  pull_request: 
    types: [closed, merged, labeled]
  workflow_dispatch:
jobs:
  call-workflow-preview:
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    with:
      app-env: # preview                  
      working-directory: # specify your working folder from repo
    secrets:
      aws-access-key-id: # AWS Access Key ID for preview
      aws-secret-access-key: # AWS Secret Access Key for preview

  call-workflow-stage:
    if: ${{ github.base_ref == 'stage' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    with:
      app-env: # stage                      
      working-directory: # specify your working folder from repo
    secrets:
      aws-access-key-id: # AWS Access Key ID for stage
      aws-secret-access-key: # AWS Secret Access Key for stage

  call-workflow-prod:
    if: ${{ github.base_ref == 'master' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    with:
      app-env: # prod                   
      working-directory: # specify your working folder from repo
    secrets:
      aws-access-key-id: # AWS Access Key ID for prod
      aws-secret-access-key: # AWS Secret Access Key for prod
```
