## [Cloud Run Deploy with Auto Rollback reusable workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/shared-cloudrun-rollback.yml)



### Overview

The Cloud Run Deploy with Auto Rollback reusable workflow is designed to make Cloud Run deployments safer and more reliable.

It deploys a new Docker image to a Cloud Run service while preserving the currently active revision.
If the deployment fails, parent workflows can automatically roll back traffic to the last stable revision.

This approach helps reduce production risk and ensures quick recovery from failed deployments.

### Features

* Deploys a Docker image to Google Cloud Run

* Captures the currently active revision before deployment

* Exposes the previous revision as a workflow output

* Enables automatic rollback on deployment failure

* Uses secure GCP authentication via Service Account

* Designed as a reusable workflow for multiple services

### Usage

### Workflow Location
```
.github/workflows/cloudrun-rollback.yml
```
#### Example
```yaml
name: Deploy to Cloud Run

on:
  workflow_dispatch:

jobs:
  deploy-backend:
    uses: clouddrove/github-shared-workflows/.github/workflows/cloudrun-rollback.yml@master
    with:
      gcp_registry_host:     # GCP Artifact Registry host
      IMAGE_NAME:            # Docker image name
      IMAGE_TAG:             # Image tag to deploy
      SERVICE_NAME:          # Cloud Run service name
      REGION:                # GCP region
      GCP_REPOSITORY:        # Artifact Registry repository
    secrets:
      GCP_PROJECT_ID:        # GCP Project ID
      GCP_SA_KEY:            # GCP Service Account key (JSON)    
```          

#### Reference workflow:
The rollback logic used by this workflow is implemented in
```
actions/cloudrun-rollback
```