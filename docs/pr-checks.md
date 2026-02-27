
---

## [PR Validation Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/pr-checks.yml)

This workflow automatically validates pull request titles, commit messages, and labels against conventional commit standards. `.github/workflows/pr-checks.yml`

### Overview
Automatically validates:
- PR titles follow conventional commit format
- Commit messages follow conventional commit standards
- Presence of at least one label on the PR
- Supports all standard conventional commit types

### Features
- Configurable conventional commit types
- Label requirement check (default true)
- Customizable subject pattern (default requires uppercase start)
- Supports WIP PRs
- Validates single commit messages when enabled
- Comprehensive error messages for validation failures

### Usage
This workflow triggers automatically on PR events and can be configured with input parameters.

#### Example Implementation
```yaml
name: 'PR Validation'

on:
  pull_request_target:
    types:
      - opened
      - edited
      - synchronize
      - reopened

jobs:
  pr-validation:
    uses: clouddrove/github-shared-workflows/.github/workflows/pr-checks.yml@2.0.0
    secrets: inherit
    with:
      types: |
        fix
        feat
        docs
        ci
        chore
        test
        refactor
        style
        perf
        build
        revert
      checkLabels: true  # Set to false to disable label checking
```

#### Optional Configuration
```yaml
    with:
      requireScope: false  # Whether to require scope in commit messages
      subjectPattern: '^[A-Z].+$'  # Regex pattern for subject validation
      validateSingleCommit: false  # Validate single commit message only
      checkLabels: true  # Whether to check for PR labels
```

