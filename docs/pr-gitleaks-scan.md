## [Gitleaks PR Scan Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/gitleaks-pr-scan.yml)

This reusable workflow runs Gitleaks to detect hardcoded secrets in pull requests. It is designed to be called from organization/module repositories via `workflow_call`.

#### Usage
Use this workflow when you want a centralized and consistent secret-scanning gate managed from `clouddrove/github-shared-workflows`.

### Highlights
- ✅ Reusable `workflow_call` implementation
- 🔐 Detects leaked credentials/secrets in PR code changes
- 🧩 Can be consumed by `.github` policy repos and module repos
- 🛡️ Uses `GITHUB_TOKEN` from caller context (`secrets: inherit`)

#### Example
```yaml
name: Gitleaks PR Secret Scan

on:
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  gitleaks:
    uses: clouddrove/github-shared-workflows/.github/workflows/gitleaks-pr-scan.yml@v2
    secrets: inherit
```
