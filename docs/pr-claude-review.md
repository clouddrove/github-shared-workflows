## Claude Code PR Checks Workflow


This reusable workflow integrates Anthropic Claude to automatically review Pull Requests and provide feedback using inline comments and a summary review.

The Claude Code Review action is triggered when the workflow is called from another workflow using workflow_call.

#### Usage

This workflow provides:

- Regular PR checks (e.g., repo checkout)

- Claude Code review with configurable prompt

- Inline and summary feedback on PRs

#### Example Caller Workflow

```yaml

name: PR Checks Caller

on:
  pull_request:
    branches: ["master"]   # Limits this workflow to trigger only when PRs are opened against the 'master' branch
    types: [opened, reopened, synchronize]

permissions:
  id-token: write
  contents: read
  actions: read

jobs:
  claude-feedback:
    uses: clouddrove/github-shared-workflows/.github/workflows/claude-pr-review.yml@2.0.0
    secrets:
      ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }} # Secret API key used to authenticate with Claude (Anthropic)
```

