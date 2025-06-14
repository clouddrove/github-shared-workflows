## [Stale Issues and PRs Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/stale_pr.yml)

This workflow automatically marks and closes stale issues and pull requests after periods of inactivity. `.github/workflows/stale_pr.yml`

### Overview
Automatically:
- Marks issues as stale after 30 days of inactivity
- Marks PRs as stale after 30 days of inactivity
- Closes stale issues after 10 more days
- Closes stale PRs after 10 more days
- Deletes branches of closed PRs
- Exempts items with specific labels or milestones

### Features
- Configurable time periods for staleness and closure
- Customizable stale and close messages
- Exclusion for items with specific labels (`bug`, `wip`, `on-hold`, `no-stale`)
- Exclusion for all items with milestones
- Automatic branch cleanup for closed PRs

### Usage
This workflow is designed to be called from other workflows using GitHub's `workflow_call` trigger.

#### Example Implementation
```yaml
name: 'Mark or close stale issues and PRs'

on:
  schedule:
    - cron: '0 0 * * 5'  # Runs every Friday midnight
  workflow_dispatch:
  push:
    branches:
      - 'main'

jobs:
  stale-pr:
    uses: clouddrove/github-shared-workflows/.github/workflows/stale_pr.yml@master
    with:
      days-before-issue-stale: 30  # Days until issue marked stale
      days-before-pr-stale: 30     # Days until PR marked stale
      days-before-issue-close: 10  # Days after stale until issue closed
      days-before-pr-close: 10     # Days after stale until PR closed