## [TFSec Security Scan Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/security-tfsec.yml)

This reusable workflow runs TFSec to scan Terraform code for security misconfigurations. It supports GitHub's security dashboard via SARIF upload and adds PR comments with security findings.

### Overview

TFSec is a static analysis security scanner for Terraform code that identifies security misconfigurations and compliance issues. This workflow integrates TFSec scanning with GitHub's security features and provides PR feedback.

### Features

- ✅ **Reusable workflow_call** - Modular implementation for easy integration
- 📄 **SARIF Upload** - Results appear in GitHub Security tab
- 💬 **PR Comments** - Automatic comments on pull requests with security findings
- 🔍 **Full Repository Scan** - Scans entire repository or specified directory
- 🛡️ **Advanced Security Scan** - Additional Terraform security scanning with PR comments

### Usage

#### Basic Example

```yaml
name: Security Scan

on:
  pull_request:
    branches: [master]
    types: [opened, synchronize]

jobs:
  tfsec-scan:
    uses: clouddrove/github-shared-workflows/.github/workflows/security-tfsec.yml@master
    secrets:
      GITHUB: ${{ secrets.GITHUB_TOKEN }}
```

#### With Custom Working Directory

```yaml
name: Security Scan

on:
  pull_request:
    branches: [master]

jobs:
  tfsec-scan:
    uses: clouddrove/github-shared-workflows/.github/workflows/security-tfsec.yml@master
    secrets:
      GITHUB: ${{ secrets.GITHUB_TOKEN }}
    with:
      working_directory: './terraform/'
```

### Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `working_directory` | Directory where Terraform files exist | No | `./examples/` |

### Secrets

| Secret | Description | Required |
|--------|-------------|----------|
| `GITHUB` | GitHub Personal Access Token (PAT) with appropriate permissions | Yes |

### Workflow Steps

1. **Clone Repository** - Checks out the repository code
2. **Run TFSec** - Scans Terraform files for security issues
3. **Upload SARIF** - Uploads results to GitHub Security tab
4. **PR Comment** - Adds comment to PR with security findings
5. **Advanced Scan** - Runs additional Terraform security scan (on PRs only)

### Security Dashboard Integration

The workflow uploads SARIF results to GitHub's Security tab, where you can:
- View all security findings in one place
- Track security issues over time
- Integrate with GitHub Advanced Security features

### PR Comments

When run on pull requests, the workflow automatically:
- Adds comments summarizing security findings
- Highlights specific issues in the code
- Provides recommendations for fixing issues

### Best Practices

1. **Run on PRs** - Catch security issues before merging
2. **Use PAT** - Ensure GITHUB secret has appropriate permissions
3. **Review Findings** - Regularly check GitHub Security tab
4. **Fix Issues** - Address security findings promptly

### Related Workflows

- [Security Checkov](./security-checkov.md) - IaC security scanning with Checkov
- [Security Prowler](./security-prowler.md) - Cloud security assessment
- [Security Powerpipe](./security-powerpipe.md) - Compliance checking

### Additional Resources

- [TFSec Documentation](https://aquasecurity.github.io/tfsec/)
- [GitHub Security Features](https://docs.github.com/en/code-security)
- [SARIF Format](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)
