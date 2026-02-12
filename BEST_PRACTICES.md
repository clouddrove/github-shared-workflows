# 🎯 Best Practices Guide

Learn how to use GitHub Shared Workflows effectively and securely.

## 🔒 Security Best Practices

### 1. Use Version Tags, Not Branches
```yaml
# ❌ Bad - Uses latest code which may change
uses: clouddrove/github-shared-workflows/.github/workflows/tf-checks.yml@master

# ✅ Good - Uses specific version
uses: clouddrove/github-shared-workflows/.github/workflows/tf-checks.yml@v1.2.0
```

### 2. Never Commit Secrets
```yaml
# ❌ Bad - Secrets in workflow file
secrets:
  AWS_ACCESS_KEY_ID: "AKIAIOSFODNN7EXAMPLE"

# ✅ Good - Use GitHub Secrets
secrets:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
```

### 3. Use Least Privilege Permissions
```yaml
# ✅ Good - Only grant necessary permissions
permissions:
  contents: read
  pull-requests: write
```

### 4. Review Workflow Code
- Always review workflow code before using
- Understand what actions are being executed
- Check for security vulnerabilities

## ⚡ Performance Best Practices

### 1. Use Matrix Strategies Wisely
```yaml
# ✅ Good - Parallel execution
strategy:
  matrix:
    terraform-version: [1.0, 1.1, 1.2]
  fail-fast: false
```

### 2. Cache Dependencies
```yaml
# ✅ Good - Cache Terraform providers
- uses: actions/cache@v3
  with:
    path: .terraform
    key: ${{ runner.os }}-terraform-${{ hashFiles('**/*.tf') }}
```

### 3. Use Conditional Steps
```yaml
# ✅ Good - Skip unnecessary steps
- name: Deploy
  if: github.ref == 'refs/heads/main'
```

## 📋 Workflow Organization

### 1. Group Related Jobs
```yaml
jobs:
  validate:
    # Validation jobs
  test:
    # Testing jobs
  deploy:
    needs: [validate, test]
    # Deployment jobs
```

### 2. Use Descriptive Names
```yaml
# ✅ Good
- name: 🏗️ Build Docker Image for Production

# ❌ Bad
- name: build
```

### 3. Document Complex Logic
```yaml
# ✅ Good - Add comments for complex steps
- name: Calculate version
  # Uses semantic versioning based on PR labels
  # Major: breaking changes
  # Minor: new features
  # Patch: bug fixes
```

## 🔄 Workflow Reusability

### 1. Use Inputs for Flexibility
```yaml
inputs:
  environment:
    description: 'Deployment environment'
    required: true
    type: choice
    options:
      - staging
      - production
```

### 2. Provide Sensible Defaults
```yaml
inputs:
  timeout:
    description: 'Workflow timeout in minutes'
    required: false
    default: '30'
    type: number
```

### 3. Make Workflows Composable
```yaml
# ✅ Good - Can be used independently or together
jobs:
  validate:
    uses: ./workflows/tf-checks.yml
  deploy:
    needs: validate
    uses: ./workflows/tf-workflow.yml
```

## 📊 Monitoring & Debugging

### 1. Add Job Summaries
```yaml
- name: Job Summary
  if: always()
  run: |
    echo "## Workflow Results" >> $GITHUB_STEP_SUMMARY
    echo "- Status: ${{ job.status }}" >> $GITHUB_STEP_SUMMARY
```

### 2. Use Artifacts for Debugging
```yaml
- name: Upload logs
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: debug-logs
    path: logs/
```

### 3. Set Appropriate Timeouts
```yaml
jobs:
  deploy:
    timeout-minutes: 30
```

## 🎨 Code Quality

### 1. Follow Naming Conventions
- Use kebab-case for workflow files
- Use descriptive prefixes (tf-, cf-, pr-)
- Use emojis consistently for visual clarity

### 2. Validate Inputs
```yaml
- name: Validate inputs
  run: |
    if [ -z "${{ inputs.required_field }}" ]; then
      echo "Error: required_field is missing"
      exit 1
    fi
```

### 3. Handle Errors Gracefully
```yaml
- name: Deploy
  continue-on-error: true
  run: |
    # Deployment logic
```

## 📚 Documentation Standards

### 1. Every Workflow Needs Documentation
- Clear description
- Input parameters table
- Secrets table
- At least 2-3 examples
- Common use cases

### 2. Include Examples for All Providers
- AWS example
- Azure example
- GCP example (if applicable)
- Multi-cloud example (if applicable)

### 3. Document Breaking Changes
- Use CHANGELOG.md
- Tag releases appropriately
- Provide migration guides

## 🚀 Performance Tips

1. **Parallel Jobs** - Run independent jobs in parallel
2. **Conditional Execution** - Skip steps when not needed
3. **Caching** - Cache dependencies and build artifacts
4. **Matrix Optimization** - Use fail-fast: false for independent tests
5. **Resource Limits** - Set appropriate timeouts and resource limits

## 🔍 Troubleshooting

### Common Issues

1. **Workflow Not Found**
   - Check workflow path is correct
   - Verify branch/tag exists
   - Ensure workflow file exists

2. **Permission Denied**
   - Check workflow permissions
   - Verify secrets are set
   - Check repository settings

3. **Timeout Errors**
   - Increase timeout values
   - Optimize workflow steps
   - Check for hanging processes

## 📖 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Reusable Workflows Guide](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
