# 📋 Workflow Catalog

Complete index of all available workflows organized by category and use case.

## 🔍 Quick Search

| Need | Workflow |
|------|----------|
| Validate Terraform | [tf-checks.yml](./.github/workflows/tf-checks.yml) |
| Deploy Infrastructure | [tf-workflow.yml](./.github/workflows/tf-workflow.yml) |
| Build Docker Image | [docker-build-push.yml](./.github/workflows/docker-build-push.yml) |
| Deploy Helm Chart | [helm-deploy.yml](./.github/workflows/helm-deploy.yml) |
| AWS Cloud Audit | [clens.yml](./.github/workflows/clens.yml) |
| Scan Security | [security-checkov.yml](./.github/workflows/security-checkov.yml) |
| Validate PR | [pr-checks.yml](./.github/workflows/pr-checks.yml) |
| Auto Assign PR | [pr-auto-assignee.yml](./.github/workflows/pr-auto-assignee.yml) |
| Release Tags | [release-tag.yml](./.github/workflows/release-tag.yml) |
| Slack Notifications | [notify-slack.yml](./.github/workflows/notify-slack.yml) |

## 📊 By Category

### ☁️ Infrastructure as Code

#### Terraform Workflows
| Workflow | Description | Use Case |
|----------|-------------|----------|
| [tf-checks.yml](./.github/workflows/tf-checks.yml) | Validate, format, init, plan | Pre-commit validation |
| [stf-checks.yml](./.github/workflows/stf-checks.yml) | Validate, format, init, plan | Pre-commit validation |
| [tf-workflow.yml](./.github/workflows/tf-workflow.yml) | Full lifecycle (plan, apply, destroy) | Infrastructure deployment |
| [tf-lint.yml](./.github/workflows/tf-lint.yml) | Lint Terraform code | Code quality checks |
| [tf-drift.yml](./.github/workflows/tf-drift.yml) | Detect infrastructure drift | Compliance checking |
| [tf-pr-checks.yml](./.github/workflows/tf-pr-checks.yml) | PR plan comparison | Change review |
| [tf-smurf.yml](./.github/workflows/tf-smurf.yml) | Smurf-based Terraform operations | Advanced workflows |
| [tf-monorepo-tag-release.yml](./.github/workflows/tf-monorepo-tag-release.yml) | Auto-tag modules in monorepo | Module versioning |

#### CloudFormation Workflows
| Workflow | Description | Use Case |
|----------|-------------|----------|
| [cf-deploy.yml](./.github/workflows/cf-deploy.yml) | Deploy CloudFormation stack | AWS infrastructure |
| [cf-deploy-stackset.yml](./.github/workflows/cf-deploy-stackset.yml) | Deploy StackSets | Multi-account deployments |
| [cf-lint.yml](./.github/workflows/cf-lint.yml) | Lint CloudFormation templates | Template validation |

### 🐳 Container Workflows

| Workflow | Description | Use Case |
|----------|-------------|----------|
| [docker-build-push.yml](./.github/workflows/docker-build-push.yml) | Build and push images | CI/CD pipelines |
| [docker-scanner.yml](./.github/workflows/docker-scanner.yml) | Scan for vulnerabilities | Security checks |
| [docker-scout.yml](./.github/workflows/docker-scout.yml) | Docker Scout analysis | Image analysis |
| [docker-smurf-helm.yml](./.github/workflows/docker-smurf-helm.yml) | Docker + Helm with Smurf | Full stack deployment |

### ☸️ Kubernetes Workflows

| Workflow | Description | Use Case |
|----------|-------------|----------|
| [helm-deploy.yml](./.github/workflows/helm-deploy.yml) | Deploy Helm charts | Kubernetes deployments |

### 🔐 Security Workflows

| Workflow | Description | Use Case |
|----------|-------------|----------|
| [security-checkov.yml](./.github/workflows/security-checkov.yml) | IaC security scanning | Security compliance |
| [security-prowler.yml](./.github/workflows/security-prowler.yml) | Cloud security assessment | Multi-cloud security |
| [security-powerpipe.yml](./.github/workflows/security-powerpipe.yml) | Compliance checking | Regulatory compliance |
| [security-tfsec.yml](./.github/workflows/security-tfsec.yml) | Terraform security scanner | Terraform security |

### 🔄 PR Automation Workflows

| Workflow | Description | Use Case |
|----------|-------------|----------|
| [pr-checks.yml](./.github/workflows/pr-checks.yml) | Validate PR titles/commits | PR quality |
| [pr-auto-assignee.yml](./.github/workflows/pr-auto-assignee.yml) | Auto-assign reviewers | Team workflow |
| [pr-auto-merge.yml](./.github/workflows/pr-auto-merge.yml) | Auto-merge Dependabot PRs | Dependency management |
| [pr-claude-review.yml](./.github/workflows/pr-claude-review.yml) | AI code review (Claude) | Code quality |
| [pr-gemini-review.yml](./.github/workflows/pr-gemini-review.yml) | AI code review (Gemini) | Code quality |
| [pr-gitleaks-scan.yml](./.github/workflows/pr-gitleaks-scan.yml) | Secret scanning | Security |
| [pr-lock.yml](./.github/workflows/pr-lock.yml) | Lock stale PRs/issues | Repository maintenance |
| [pr-stale.yml](./.github/workflows/pr-stale.yml) | Mark stale PRs | Cleanup |

### 🚀 Release Workflows

| Workflow | Description | Use Case |
|----------|-------------|----------|
| [release-tag.yml](./.github/workflows/release-tag.yml) | Semantic versioning | Version management |
| [release-changelog.yml](./.github/workflows/release-changelog.yml) | Generate changelog | Release notes |
| [release-changelog-internal.yml](./.github/workflows/release-changelog-internal.yml) | Internal changelog | Internal releases |

### ☁️ Cloud-Specific Workflows

#### AWS
| Workflow | Description | Use Case |
|----------|-------------|----------|
| [clens.yml](./.github/workflows/clens.yml) | AWS cloud audit & security reports | Inventory, IAM, cost, security |
| [aws-prowler.yml](./.github/workflows/aws-prowler.yml) | AWS security scanning | AWS compliance |
| [aws-ssm-send-command.yml](./.github/workflows/aws-ssm-send-command.yml) | Execute commands via SSM | Remote execution |
| [aws-remote-ssh-command.yml](./.github/workflows/aws-remote-ssh-command.yml) | Execute SSH commands | Remote management |

#### GCP
| Workflow | Description | Use Case |
|----------|-------------|----------|
| [gcp-prowler.yml](./.github/workflows/gcp-prowler.yml) | GCP security scanning | GCP compliance |

### 📢 Notification Workflows

| Workflow | Description | Use Case |
|----------|-------------|----------|
| [notify-slack.yml](./.github/workflows/notify-slack.yml) | Slack notifications | Team alerts |

### 🛠️ Utility Workflows

| Workflow | Description | Use Case |
|----------|-------------|----------|
| [yml-lint.yml](./.github/workflows/yml-lint.yml) | YAML linting | Code quality |
| [yml-lint-internal.yml](./.github/workflows/yml-lint-internal.yml) | Internal YAML linting | Internal checks |
| [readme.yml](./.github/workflows/readme.yml) | Generate README | Documentation |
| [infracost.yml](./.github/workflows/infracost.yml) | Cost estimation | Cost management |
| [sst_workflow.yml](./.github/workflows/sst_workflow.yml) | SST deployment | Serverless |

## 🎯 Use Case Matrix

| Use Case | Recommended Workflows |
|----------|----------------------|
| **Terraform CI/CD** | tf-checks.yml → tf-workflow.yml |
| **Docker Pipeline** | docker-scanner.yml → docker-build-push.yml |
| **Kubernetes Deploy** | helm-deploy.yml |
| **Security Scanning** | security-checkov.yml, security-prowler.yml |
| **PR Automation** | pr-checks.yml, pr-auto-assignee.yml, pr-gitleaks-scan.yml |
| **Release Management** | release-tag.yml, release-changelog.yml |
| **Multi-Cloud Security** | security-prowler.yml, aws-prowler.yml, gcp-prowler.yml |
| **Cost Optimization** | infracost.yml |
| **Code Quality** | yml-lint.yml, tf-lint.yml, pr-checks.yml |

## 📈 Workflow Combinations

### Complete CI/CD Pipeline
```yaml
1. pr-checks.yml          # Validate PR
2. tf-checks.yml          # Terraform validation
3. security-checkov.yml   # Security scan
4. docker-scanner.yml     # Container scan
5. docker-build-push.yml  # Build & push
6. tf-workflow.yml        # Deploy infrastructure
7. helm-deploy.yml        # Deploy to Kubernetes
8. notify-slack.yml       # Notify team
9. stf-checks.yml         # Smurf Terraform Validation
```

### Security-First Pipeline
```yaml
1. pr-gitleaks-scan.yml   # Secret detection
2. security-checkov.yml   # IaC security
3. security-tfsec.yml     # Terraform security
4. security-prowler.yml   # Cloud security
5. docker-scanner.yml     # Container security
```

## 🔗 Related Documentation

- [Quick Start Guide](./QUICKSTART.md)
- [Best Practices](./BEST_PRACTICES.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Full Documentation](./README.md#-table-of-contents)
