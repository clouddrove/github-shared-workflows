## [Auto Merge Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/auto_merge.yml)

This workflow automated process of Approving and Merging pull request created by dependabot  `.github/workflows/auto_merge.yml`

#### Usage
To use auto-merge workflow, update the ${{ secrets.GITHUB }} with your Personal Access Token (PAT).
Pass your GitHub action name in `tfcheck` variable.

#### Example
```yaml
name: Auto merge
on:
  pull_request3:
jobs:
  auto-merge:
    uses: clouddrove/github-shared-workflows/.github/workflows/automerge.yml@master
    secrets:
      GITHUB: ${{ secrets.GITHUB }}
    with:
      tfcheck: ## tf-check action name
```