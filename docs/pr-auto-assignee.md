## [Auto Assign Assignee Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/pr-auto-assignee.yml)

This workflow automates process for assigning assignees to the PR which would opened or reopened from a users list. Workflows have been added in `.github/workflows/pr-auto-assignee.yml`

#### Usage
This workflow can be used to automatically assign assignees to a PR when it is opened or reopened.
* If a list of users is provided, one user will be randomly selected and assigned.
* You can also enable assigning the PR opener to themselves using the `assign_yourself` flag.

| Name              | Description                                           | Required | Type    |
| ----------------- | ----------------------------------------------------- | -------- | ------- |
| `assignees`       | List of GitHub usernames to randomly assign to the PR | No       | String  |
| `assign_yourself` | Whether to assign the PR creator as an assignee       | No      | Boolean |



#### Example
```yaml
name: Auto Assign PRs

on:
  pull_request:
    types: [opened, reopened]

  workflow_dispatch:
jobs:
  assign-pr:
      uses: clouddrove/github-shared-workflows/.github/workflows/pr-auto-assignee.yml@v2
      secrets:
        GITHUB: ${{ secrets.TOKEN_GITHUB }}
      with:  
      assignees: user1,user2,user3   # List of usernames
      assign_yourself: true          # Assign PR creator as assignee
```