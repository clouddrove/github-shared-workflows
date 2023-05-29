## [Auto Assign Assignee Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/auto-assignee.yml)

This workflow automates process for assigning assignees to the PR which would opened or reopened from a users list. Workflows have been added in `.github/workflows/auto-assignee-caller.yml`

#### Usage
Below workflow can be used to automatically assign the assignee to a pull request (PR) when the request is opened or reopened from the specified branch. If we provide a list of users, it will randomly select one user and assign as assignee to the PR.

#### Example
```yaml
name: Auto Assign PRs

on:
  pull_request:
    types: [opened, reopened]

  workflow_dispatch:
jobs:
  assign-pr:
      uses: clouddrove/github-shared-workflows/.github/workflows/auto-assignee.yml@master
      secrets:
        GITHUB: ${{ secrets.TOKEN_GITHUB }}
      with:  
        assignees: #list of usernames of assignees
```