# CI/CD Pipeline Workflow

## Overview

The CI/CD pipeline workflow (`ci.yml`) automatically validates, tests, and ensures quality standards for all workflows in this repository. It runs on every push and pull request to the `master` or `main` branch.

## Features

- ✅ **YAML Syntax Validation** - Validates all workflow YAML files for correct syntax
- 🧹 **YAML Linting** - Enforces consistent YAML formatting and style
- 🔍 **Workflow Structure Validation** - Ensures all workflows have required fields
- 🔒 **Security Scanning** - Checks for security vulnerabilities and hardcoded secrets
- 📚 **Documentation Validation** - Verifies documentation exists and links are valid
- 🏷️ **Naming Convention Check** - Ensures workflows follow naming standards
- 🔍 **Actionlint** - Advanced GitHub Actions workflow validation
- ⚠️ **Deprecated Actions Check** - Warns about outdated action versions
- 🔐 **Permission Validation** - Reviews workflow permissions for security

## Workflow Triggers

- **Push** to `master` or `main` branch
- **Pull Request** to `master` or `main` branch
- **Manual Dispatch** via GitHub Actions UI

## Jobs

### 1. Validate YAML Syntax (`validate-yaml`)
- Validates all `.github/workflows/*.yml` files using Python's YAML parser
- Ensures files are syntactically correct and can be parsed

### 2. Lint YAML Files (`lint-yaml`)
- Runs `yamllint` with custom configuration (`.yamllint.yml`)
- Checks indentation, line length, trailing spaces, and formatting
- Reports warnings and errors for style issues

### 3. Validate Workflow Structure (`validate-workflows`)
- Checks that all workflows have required fields (`name`, `jobs`)
- Validates reusable workflows have proper `workflow_call` configuration
- Ensures workflows follow GitHub Actions best practices

### 4. Security Scan (`security-scan`)
- Runs TFSec and Checkov security scanners
- Checks for hardcoded secrets (passwords, API keys)
- Identifies security vulnerabilities in workflow configurations
- Uses `soft_fail: true` to report issues without failing the build

### 5. Validate Documentation (`validate-docs`)
- Ensures every workflow has corresponding documentation in `docs/`
- Validates all links in `README.md` point to existing files
- Checks documentation completeness

### 6. Validate Naming Conventions (`validate-naming`)
- Verifies workflows follow prefix-based naming conventions:
  - `tf-*` - Terraform workflows
  - `cf-*` - CloudFormation workflows
  - `pr-*` - Pull Request workflows
  - `aws-*` - AWS-specific workflows
  - `gcp-*` - GCP-specific workflows
  - `security-*` - Security workflows
  - `release-*` - Release workflows
  - `notify-*` - Notification workflows
  - `docker-*` - Docker workflows
  - `helm-*` - Helm workflows
  - `yml-*` - YAML lint workflows

### 7. Actionlint (`actionlint`)
- Advanced GitHub Actions workflow validator
- Checks for common mistakes, deprecated features, and best practices
- Reports findings as PR review comments

### 8. Check Deprecated Actions (`check-deprecated`)
- Scans for outdated action versions
- Warns about actions that should be updated (e.g., `actions/checkout@v1`)

### 9. Validate Permissions (`validate-permissions`)
- Reviews workflow permissions for security
- Ensures workflows request only necessary permissions

### 10. Generate Documentation Index (`generate-docs`)
- Runs only on pushes to `master` branch
- Generates `WORKFLOW_INDEX.md` with categorized workflow list
- Uploads index as artifact

### 11. CI Summary (`ci-summary`)
- Aggregates results from all jobs
- Creates a summary report in GitHub Actions UI
- Displays statistics about workflows and documentation

## Configuration

### YAML Lint Configuration (`.yamllint.yml`)

The repository includes a `.yamllint.yml` configuration file that defines linting rules:

```yaml
rules:
  line-length:
    max: 500
    level: warning
  indentation:
    level: error
  trailing-spaces:
    level: error
  # ... more rules
```

## Permissions

The workflow requires the following permissions:
- `contents: read` - To read repository files
- `pull-requests: write` - To comment on PRs (actionlint)
- `checks: write` - To create check runs

## Usage

The CI/CD pipeline runs automatically. No manual configuration is required.

### Running Locally

To validate workflows locally before pushing:

```bash
# Install Python dependencies
pip install pyyaml

# Validate YAML syntax
for file in .github/workflows/*.yml; do
  python3 -c "import yaml, sys; yaml.safe_load(open('$file'))"
done

# Install yamllint
pip install yamllint

# Run linting
yamllint .github/workflows/
```

### Fixing Common Issues

1. **YAML Syntax Errors**
   - Check indentation (use 2 spaces, not tabs)
   - Ensure proper key-value pairs
   - Verify quotes around strings with special characters

2. **Linting Errors**
   - Remove trailing spaces
   - Add newline at end of file
   - Fix indentation issues

3. **Security Warnings**
   - Replace hardcoded values with `secrets.*` references
   - Review permissions and minimize scope
   - Update deprecated actions

4. **Documentation Issues**
   - Create missing documentation files
   - Fix broken links in README.md
   - Ensure workflow names match documentation filenames

## Best Practices

1. **Run CI Locally First** - Validate changes before pushing
2. **Fix Warnings** - Don't ignore linting warnings
3. **Keep Actions Updated** - Regularly update action versions
4. **Document Changes** - Update docs when modifying workflows
5. **Review Security** - Pay attention to security scan results

## Related Workflows

- [YAML Lint Workflow](./yml-lint.md) - Standalone YAML linting workflow
- [YAML Lint Internal Workflow](./yml-lint-internal.md) - Internal YAML validation

## Troubleshooting

### CI Fails on YAML Validation
- Check for syntax errors in the workflow file
- Verify indentation is correct (2 spaces)
- Ensure all quotes are properly closed

### Security Scan Reports False Positives
- Review the specific finding
- Some warnings may be acceptable (e.g., public URLs)
- Use `soft_fail: true` to continue on warnings

### Documentation Validation Fails
- Create missing documentation files
- Fix broken links in README.md
- Ensure filenames match between workflows and docs

## Contributing

When adding new workflows:
1. Ensure they pass all CI checks
2. Create corresponding documentation
3. Follow naming conventions
4. Update README.md with links
5. Test locally before submitting PR
