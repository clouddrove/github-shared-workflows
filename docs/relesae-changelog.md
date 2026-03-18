# Changelog
Changelog = human-readable summary of changes in each version of your project

## Usage
This release-changelog.yml workflow updates your Release page by categorizing changes into Fix, Feat, Docs, Tests, etc. An example release page can be found here: [2.1.1](https://github.com/clouddrove/github-shared-workflows/releases/tag/2.1.1).
- This workflow is automatically triggered when a release tag is created in the GitHub repository.
- You can also trigger it manually by providing an existing release tag version to update its Release page.

## Example
When running manually, you need to provide existing repository release tag name. [eg: 2.1.1]

#### 
```yaml
name: changelog
permissions: write-all
on:
  push: 
    tags:
      - '*'
  workflow_dispatch:
    inputs:
      tag:
        required: true   
        type: string
        description: "Enter the semantic version tag (eg: 2.3.2) for which you want to update the changelog"
jobs:
  changelog:
    uses: clouddrove/github-shared-workflows/.github/workflows/release-changelog.yml@v2
    with:
      branch: master
      tag: ${{ inputs.tag || '' }} 
    secrets:
        GITHUB: ${{ secrets.GITHUB }}
```



