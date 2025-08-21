**---**
**## [Lock Threads Workflow](https://github.com/dessant/lock-threads)**
This GitHub Action automatically locks closed issues, pull requests, and discussions after a period of inactivity.

<img width="800" src="https://raw.githubusercontent.com/dessant/lock-threads/main/assets/screenshot.png">

**### Overview**
Automatically locks:
- Closed issues after defined period of inactivity (default 365 days)
- Closed pull requests after defined period of inactivity (default 365 days)
- Closed discussions after defined period of inactivity (default 365 days)
- Supports comprehensive filtering options for which items to lock

**### Features**
- Filtering by creation and closure dates
- Label-based inclusion and exclusion rules
- Ability to add/remove labels before locking
- Custom comment posting before locking
- Configurable lock reasons
- Process only specific item types (issues, PRs, discussions)
- Detailed output logging of locked items
- Uses GitHub's updated search qualifier to determine inactivity

**### Usage**
This workflow can run on a schedule or be manually triggered with workflow_dispatch.

**#### Example Implementation**
```yaml
name: 'Lock Threads'
permissions:
    issues: write
    pull-requests: write
    
on:
  schedule:
    - cron: '50 1 * * *'
  workflow_dispatch:

jobs:
  lock:
    uses: clouddrove-sandbox/terraform-shared-workflows/.github/workflows/lock-thread.yml@master
    secrets:
      github-token: ${{ secrets.REPO_TOKEN }}
```

**#### Optional Configuration**
```yaml
with:
  issue-inactive-days: '30'  # Days before locking inactive issues
  pr-inactive-days: '30'     # Days before locking inactive PRs  
  include-any-issue-labels: 'outdated, resolved'  # Only lock issues with these labels
  exclude-any-pr-labels: 'wip'  # Don't lock PRs with these labels
  issue-comment: 'This issue has been locked due to inactivity'  # Comment before locking
  process-only: 'issues, prs'  # Only process specific item types
```