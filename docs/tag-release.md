## [Tag Release](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/tag-release.yaml)
This reusable workflow automatically bumps semantic version tags (vX.Y.Z) and generates a categorized changelog on every PR merge, based on PR labels.
Release notes include a compare link.
It utilizes the workflows defined in `.github/workflows/tag-release.yaml`

### Features

- Label-driven versioning based on semantic versioning
- Automatic changelog generation
- Auto-tagging with vX.Y.Z format
- Skips tagging when needed via label

### Label Behavior

Before merging a PR, apply one of the following labels to control the version bump:

| Label   | Effect on Version        | Example Change       |
|---------|--------------------------|-----------------------|
| major   | Increases major version  | v1.2.3 → v2.0.0       |
| minor   | Increases minor version  | v1.2.3 → v1.3.0       |
| patch   | Increases patch version  | v1.2.3 → v1.2.4       |
| no-tag  | No new tag or release    | (skips tagging)       |



### Usage

```
name: Tag Release

on:
  pull_request:
    types: [closed]

jobs:
  release:
    uses: clouddrove/github-shared-workflows/.github/workflows/tag-release.yaml@master
    with:
      target_branch: master
    secrets:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
