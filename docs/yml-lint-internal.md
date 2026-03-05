## [YAML Lint Internal Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/yml-lint-internal.yml)

This workflow automatically validates YAML files on pull requests by calling the reusable YAML Lint workflow. It's designed for internal use within repositories to ensure YAML files meet quality standards before merging.

### Overview

The YAML Lint Internal workflow is a simple wrapper that triggers the reusable [YAML Lint Workflow](./yml-lint.md) on pull requests. It provides an easy way to enforce YAML quality standards without requiring manual workflow configuration.

### Features

- ✅ **Automatic Validation** - Runs automatically on every pull request
- 🔄 **Reuses Main Workflow** - Calls the reusable `yml-lint.yml` workflow
- 🎯 **Zero Configuration** - Works out of the box with default settings
- 📋 **PR Integration** - Provides feedback directly in pull requests

### Usage

#### Basic Implementation

Simply add this workflow to your repository's `.github/workflows/` directory:

```yaml
name: YAML-LINTER
on: [pull_request]

jobs:
  YAML-LINTER:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@2.0.0
```

#### Complete Example

```yaml
---
name: YAML-LINTER
on: 
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  YAML-LINTER:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@2.0.0
```

### When to Use

Use this workflow when you want:

- **Automatic YAML Validation** - No need to manually call the lint workflow
- **PR Quality Gates** - Ensure all YAML files are valid before merging
- **Simple Setup** - Minimal configuration required
- **Consistent Standards** - Enforce YAML formatting across the repository

### Workflow Behavior

1. **Trigger**: Automatically runs on pull request events
2. **Validation**: Calls the reusable `yml-lint.yml` workflow
3. **Feedback**: Provides check results in the PR status
4. **Failure**: PR checks will fail if YAML files have linting errors

### Integration with Other Workflows

This workflow can be combined with other validation workflows:

```yaml
name: 'Complete PR Validation'

on:
  pull_request:

jobs:
  # YAML validation
  yaml-lint:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint-internal.yml@master
  
  # Terraform validation
  terraform-checks:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-checks.yml@master
    with:
      working_directory: terraform/
  
  # Security scanning
  security-scan:
    uses: clouddrove/github-shared-workflows/.github/workflows/security-checkov.yml@master
```

### Customization

If you need to customize the linting behavior, you have two options:

#### Option 1: Use the Reusable Workflow Directly

Instead of using `yml-lint-internal.yml`, call `yml-lint.yml` directly with custom configuration:

```yaml
name: 'Custom YAML Lint'

on:
  pull_request:

jobs:
  yaml-lint:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
    # Add any custom steps or configuration here
```

#### Option 2: Fork and Modify

Fork the workflow and modify it to meet your specific needs:

```yaml
name: YAML-LINTER
on: 
  pull_request:
    branches: [main, master, develop]  # Customize branches

jobs:
  YAML-LINTER:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
    # Add additional steps if needed
```

### Common Use Cases

#### 1. GitHub Actions Workflows Validation

Ensure all workflow files are properly formatted:

```yaml
# This workflow will validate .github/workflows/*.yml files
name: YAML-LINTER
on: [pull_request]
jobs:
  YAML-LINTER:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
```

#### 2. Configuration Files Validation

Validate configuration files like `docker-compose.yml`, `k8s` manifests, etc.:

```yaml
name: YAML-LINTER
on: [pull_request]
jobs:
  YAML-LINTER:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
```

#### 3. Documentation Validation

Ensure YAML frontmatter in documentation files is valid:

```yaml
name: YAML-LINTER
on: [pull_request]
jobs:
  YAML-LINTER:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
```

### Troubleshooting

#### Issue: Workflow Not Running

**Solution**: Check that:
- The workflow file is in `.github/workflows/` directory
- The file has `.yml` or `.yaml` extension
- The workflow syntax is correct
- Pull requests are targeting the correct branch

#### Issue: False Positives

**Solution**: 
- Review the specific linting rule that's failing
- Some rules can be adjusted by modifying the reusable workflow
- Consider if the rule violation is acceptable for your use case

#### Issue: Too Many Errors

**Solution**:
- Fix errors incrementally
- Start with syntax errors first
- Then address formatting issues
- Use a YAML formatter to fix indentation automatically

### Best Practices

1. **Enable Early** - Add this workflow from the start of your project
2. **Fix Issues Promptly** - Don't let YAML errors accumulate
3. **Use Editor Plugins** - Install YAML linting plugins in your editor
4. **Document Exceptions** - If you need to disable certain rules, document why
5. **Regular Updates** - Keep the workflow version updated to get latest improvements

### Related Workflows

- [YAML Lint Workflow](./yml-lint.md) - The reusable workflow this wraps
- [CI/CD Pipeline](./ci.md) - Comprehensive validation including YAML linting
- [PR Checks](./pr-checks.md) - Additional PR validation workflows

### Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [YAML Specification](https://yaml.org/spec/1.2.2/)
- [yamllint Rules](https://yamllint.readthedocs.io/en/stable/rules.html)
