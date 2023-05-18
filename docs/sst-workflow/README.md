<h1 align="center">github-shared-workflows</h1>

---

# SST Workflow

This GitHub Actions workflow is designed to deploy an AWS Serverless Stack (SST) app to an AWS environment based on inputs provided to the workflow. The environment can be specified using the app-env input, and the working directory can be specified using the working-directory input.

```yaml
name:
description:
inputs:
  <input-name>:
    description:
    required: # true or false
    type: # string 

secrets:
  <secret-name>:
    description:
    required: # true or false

runs:
  using: "ubuntu-20.04"
  environment: 
      name: # github.head_ref (head branch name)
      url:  # API_ENDPOINT_URL
  defaults:
      run:
        working-directory: # working-directory-of-project
  steps:
    - name: # Checkout git repo
    - uses: # Can call any action

    - name: # Configure AWS credentials
    - uses: # Can call credentials

    - name: # Install dependencies 
    - run:  # Install yarn package manager

    - name: # Extract branch name
    - run:  # Extract the head branch name & if there is any other symbol it will convert into "-" symbol. 

    - name: # Deploy and get API endpoint
    - run:  # It will deploy our application and get url and displays this url in pull request environment(for preview env).

    - name: # Destroy SST App for Preview app environment
    - run:  # It will destroy our preview environment once pull request merged or closed.
```

Caller repositories can checkout the shared actions and call them locally by providing the action.yml path

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







