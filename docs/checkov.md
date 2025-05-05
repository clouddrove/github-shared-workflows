## [Checkov Scan Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/checkov.yml)

This reusable workflow runs Checkov to scan Infrastructure as Code (IaC) for security and compliance misconfigurations. It supports GitHub's security dashboard and adds PR comments with issue summaries.
#### Usage
Checkov is a static analysis tool that scans Infrastructure as Code (IaC) files to detect security and compliance misconfigurations. It includes over 750 built-in policies for identifying common issues and supports custom policy creation and contributions.

## Supported IaC types
### Checkov scans these IaC file types:

- ✅ Reusable workflow_call implementation for modular use
- 📄 SARIF upload for GitHub Security tab integration
- 💬 PR comments summarizing Checkov issues directly on pull requests
- 🚫 Support for skipping checks via the skip_check input

#### Example
```yaml
name: Security Scan

on:
  pull_request:
    branches: [master]
    types: [opened, synchronize]

jobs:
  checkov:
    uses: clouddrove/github-shared-workflows/.github/workflows/checkov.yml@master
    with:
      directory: '.'
      continue_on_error: 'true'
      skip_check: 'CKV_TF_1'
```
