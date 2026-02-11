# 🚀 Quick Start Guide

Get started with GitHub Shared Workflows in 5 minutes!

## Installation

No installation needed! Just reference the workflows in your repository.

## Basic Usage

### 1. Terraform Checks

```yaml
name: Terraform Validation
on: [pull_request]

jobs:
  validate:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-checks.yml@master
    with:
      working_directory: './terraform'
      provider: 'aws'
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### 2. Docker Build & Push

```yaml
name: Build and Push Docker Image
on: [push]

jobs:
  docker:
    uses: clouddrove/github-shared-workflows/.github/workflows/docker-build-push.yml@master
    with:
      provider: 'aws'
      ECR_REPOSITORY: 'my-app'
      IMAGE_TAG: ${{ github.sha }}
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### 3. PR Validation

```yaml
name: PR Checks
on: [pull_request]

jobs:
  validate:
    uses: clouddrove/github-shared-workflows/.github/workflows/pr-checks.yml@master
```

## Common Patterns

### Using Specific Versions

Instead of `@master`, use version tags for stability:

```yaml
uses: clouddrove/github-shared-workflows/.github/workflows/tf-checks.yml@v1.2.0
```

### Environment-Specific Workflows

```yaml
jobs:
  deploy:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-workflow.yml@master
    with:
      target_environment: 'production'
```

## Next Steps

- Browse all [available workflows](./README.md#-table-of-contents)
- Check [detailed documentation](./docs/) for each workflow
- See [examples](./docs/) for your specific use case

## Need Help?

- 📖 Read the [full documentation](./README.md)
- 💬 Open a [discussion](https://github.com/clouddrove/github-shared-workflows/discussions)
- 🐛 Report [issues](https://github.com/clouddrove/github-shared-workflows/issues)
