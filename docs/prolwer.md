## [Prowler Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/prowler.yml)
Prowler an open cloud security platform for our cloud environment. We get a complete report of our cloud infra.

### Usage
This workflow is used to run Prowler scan on your cloud infra for AWS, GCP or Azure. At the end of Workflow a report is also saved Artifacts.

### Example for AWS cloud provider

```yaml
name: Prowler on AWS
on:
  push:
    branches:
      - <Your_Branch>

jobs:
  prowler_aws:
    permissions:
      contents: 'read'
      id-token: 'write'

    uses: clouddrove/github-shared-workflows/.github/workflows/prowler.yml@feat/prowler-workflow
    with:
      cloud_provider: aws
      aws_region: ## AWS Region
    
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID  }}
      SERVICE_ACCOUNT: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_SESSION_TOKEN: ${{ secrets.AWS_SESSION_TOKEN }}
      BUILD_ROLE:  ${{ secrets.BUILD_ROLE }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Example for Azure cloud provider

```yaml
name: Prowler Azure
on:
  push:
    branches:
      - <Your_Branch>

jobs:
  prowler_azure:
    permissions:
      contents: 'read'
      id-token: 'write'

    uses: clouddrove/github-shared-workflows/.github/workflows/prowler.yml@feat/prowler-workflow
    with:
      cloud_provider: azure
    
    secrets:
      AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
      AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
      AZURE_TENANT_ID:  ${{ secrets.AZURE_TENANT_ID }}
```

### Example for GCP cloud provider

```yaml
name: Prowler for GCP
on:
  push:
    branches:
      - <Your_Branch>

jobs:
  prowler_gcp:
    permissions:
      contents: 'read'
      id-token: 'write'

    uses: clouddrove/github-shared-workflows/.github/workflows/prowler.yml@feat/prowler-workflow
    with:
      cloud_provider: gcp
      project_id: ## Your GCP Project ID
    
    secrets:
      WIP: ${{ secrets.WIP }}
      SERVICE_ACCOUNT: ${{ secrets.SERVICE_ACCOUNT }}
```

