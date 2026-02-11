## [YAML Lint Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/yml-lint.yml)

This workflow provides a reusable YAML linting solution that validates YAML files for syntax errors, formatting issues, and best practices. It utilizes `yamllint` to ensure consistent YAML formatting across your repository.

### Overview

The YAML Lint workflow is a reusable workflow (`workflow_call`) that can be called from other workflows to validate YAML files. It checks for:

- YAML syntax errors
- Indentation issues
- Trailing spaces
- Missing newlines at end of file
- Document structure (start/end markers)
- Key duplicates
- Formatting consistency

### Features

- ✅ **Comprehensive YAML Validation** - Checks syntax, formatting, and structure
- 🎯 **Configurable Rules** - Customizable linting rules via inline configuration
- 🔄 **Reusable** - Can be called from any workflow via `workflow_call`
- 📋 **Strict Validation** - Enforces best practices and consistent formatting
- ⚠️ **Warning & Error Levels** - Different severity levels for different rule violations

### Linting Rules

The workflow enforces the following rules:

| Rule | Level | Description |
|------|-------|-------------|
| `line-length` | Warning | Maximum line length of 450 characters |
| `comments-indentation` | Error | Comments must be properly indented |
| `indentation` | Error | Consistent indentation required |
| `trailing-spaces` | Error | No trailing whitespace allowed |
| `new-line-at-end-of-file` | Error | Files must end with a newline |
| `document-start` | Error | Document start marker required |
| `document-end` | Error | Document end marker required |
| `key-duplicates` | Error | Duplicate keys not allowed |
| `braces` | Error | Proper brace formatting |
| `brackets` | Error | Proper bracket formatting |
| `colons` | Error | Proper colon formatting |
| `commas` | Error | Proper comma formatting |
| `comments` | Error | Proper comment formatting |
| `empty-lines` | Error | Consistent empty line usage |
| `empty-values` | Warning | Empty values are discouraged |
| `float-values` | Error | Float value formatting |
| `hyphens` | Error | Proper hyphen usage |

### Usage

#### Basic Example

```yaml
name: 'Validate YAML Files'

on:
  pull_request:
  push:
    branches: [master]

jobs:
  yaml-lint:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
```

#### With Custom File/Directory

The workflow will lint all YAML files in the repository by default. To lint specific files or directories, you can modify the workflow or use it in combination with other steps:

```yaml
name: 'Lint Specific YAML Files'

on:
  pull_request:

jobs:
  lint-config:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
  
  lint-workflows:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
```

### Integration Examples

#### In CI/CD Pipeline

```yaml
name: CI/CD Pipeline

on:
  pull_request:
  push:
    branches: [master]

jobs:
  # Lint YAML files
  yaml-lint:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
  
  # Other validation steps
  terraform-validate:
    needs: yaml-lint
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-checks.yml@master
    with:
      working_directory: terraform/
```

#### With Multiple Validation Steps

```yaml
name: 'Complete Validation'

on:
  pull_request:

jobs:
  # Validate workflow files
  lint-workflows:
    uses: clouddrove/github-shared-workflows/.github/workflows/yml-lint.yml@master
  
  # Validate Terraform
  terraform-checks:
    needs: lint-workflows
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-checks.yml@master
  
  # Security scan
  security-scan:
    needs: lint-workflows
    uses: clouddrove/github-shared-workflows/.github/workflows/security-checkov.yml@master
```

### Customization

The workflow uses inline configuration for `yamllint`. To customize the rules, you would need to fork the workflow and modify the `config_data` section:

```yaml
- name: 🔍 yaml-lint
  uses: ibiqlik/action-yamllint@v3
  with:
    config_data: |
      rules:
        line-length:
          max: 500  # Change max line length
          level: warning
        # Add or modify other rules
```

### Common Issues and Solutions

#### Issue: "trailing-spaces" Error
**Solution:** Remove trailing whitespace from the end of lines. Most editors have a setting to show and remove trailing spaces.

#### Issue: "new-line-at-end-of-file" Error
**Solution:** Ensure your YAML files end with a newline character. This is a POSIX standard.

#### Issue: "indentation" Error
**Solution:** Use consistent indentation (typically 2 spaces for YAML). Avoid mixing spaces and tabs.

#### Issue: "key-duplicates" Error
**Solution:** Check for duplicate keys in your YAML file. Each key should be unique within its scope.

### Best Practices

1. **Run Locally First** - Install `yamllint` locally and run it before pushing:
   ```bash
   pip install yamllint
   yamllint .github/workflows/
   ```

2. **Fix Warnings** - Even warnings should be addressed to maintain code quality

3. **Consistent Formatting** - Use a YAML formatter or linter in your editor

4. **Document Exceptions** - If you need to disable a rule, document why

### Related Workflows

- [YAML Lint Internal Workflow](./yml-lint-internal.md) - Internal YAML validation workflow
- [CI/CD Pipeline](./ci.md) - Comprehensive CI/CD validation including YAML linting
- [Terraform Lint](./tf-lint.md) - Terraform-specific linting

### Troubleshooting

**Q: The workflow fails but I can't see the specific error?**
A: Check the workflow logs in the Actions tab. The yamllint output will show the file, line number, and rule that failed.

**Q: Can I skip certain files from linting?**
A: The workflow lints all YAML files. To exclude files, you would need to modify the workflow or use a `.yamllint` configuration file.

**Q: How do I fix indentation errors?**
A: Use 2 spaces for indentation consistently. Most YAML editors can auto-format files.

### Additional Resources

- [yamllint Documentation](https://yamllint.readthedocs.io/)
- [YAML Best Practices](https://yaml.org/spec/1.2.2/)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
