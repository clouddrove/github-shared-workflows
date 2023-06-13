## [Checkov Assignee Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/checkov.yml)

This workflow does a static code analysis tool for scanning infrastructure as code (IaC) files for misconfigurations that may lead to security or compliance problems.

#### Usage
Checkov is a static code analysis tool for scanning infrastructure as code (IaC) files for misconfigurations that may lead to security or compliance problems. Checkov includes more than 750 predefined policies to check for common misconfiguration issues. Checkov also supports the creation and contribution of custom policies.

## Supported IaC types
### Checkov scans these IaC file types:

- Terraform (for AWS, GCP, Azure and OCI)
- CloudFormation (including AWS SAM)
- Azure Resource Manager (ARM)
- Serverless framework
- Helm charts
- Kubernetes
- Docker

#### Example
```yaml
name:  checkov
on: 
  # this can be trigger based on both master and main branch.
  push:
    branches: [ "main", "master" ]
  pull_request:
    branches: [ "main", "master" ]
  workflow_dispatch:
jobs:
  checkov:
    uses: clouddrove/github-shared-workflows/.github/workflows/checkov.yml@master # shared workflow 
    with:
     directory: # specify your working folder from repo
```