## [Helm Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/helm-deploy.yml)

This workflow is used to deploy and rollback Helm charts using GitHub Actions. It utilizes the workflows defined in `.github/workflows/helm-deploy.yml`

#### Usage
The helm workflow can be triggered manually using the GitHub Actions workflow dispatch feature. It deploys or rollback Helm charts based on the specified inputs. Additionally, it also performs Helm template and Helm lint operations.
To use the helm Workflow, add the following workflow definition to your `.github/workflows/helm-deploy.yml` file:

#### Example for AWS cloud provider

```yaml
name: Helm Workflow AWS

on:
  workflow_dispatch:
    inputs:
      environment:
        required: false 
        type: choice
        description: Select Environment name
        options:
          -          # Leave blank to trigger deploy
          - rollback # Select to trigger rollback

jobs:
  aws:
    uses: clouddrove/github-shared-workflows/.github/workflows/helm-deploy.yml@master
    secrets:
      BUILD_ROLE:                             # AWS OIDC role for authentication
      AWS_ACCESS_KEY_ID:                      # AWS access key
      AWS_SECRET_ACCESS_KEY:                  # AWS secret key
      AWS_SESSION_TOKEN:                      # AWS session token (optional)
      set-parameters:                         # Optional Helm overrides, e.g., --set image.tag=latest

    with:
      provider: aws                           # Cloud provider: 'aws'
      eks-cluster-name: <EKS cluster name>    # Name of the Amazon EKS cluster
      aws-region: <AWS region>                # AWS region, e.g., 'us-east-1'
      helm-chart-directory: <chart path>      # Directory where your Helm chart is located
      release-name: <release name>            # Unique name for Helm release
      timeout: <timeout in seconds>           # Max wait time for Helm operations, e.g., '600s'
      values-file-path: <values file path>    # Path to Helm values.yaml file
      history-max: <revision count>           # Number of revisions to retain in history
      namespace: <namespace>                  # Kubernetes namespace to deploy into
      dependencies: <true|false>              # Install chart dependencies (true/false)
      uninstall: <true|false>                 # Set to true to uninstall the release
      rollback: <true|false>                  # <true|false> Trigger rollback to previous revision (true/false)
      revision: <revision number>             # Specific revision to roll back to
      diagram-file-name: <output file name>   # Optional: output file name for KubeDiagram PNG
      generate-diagram : <true|false>         # <true|false> Set to true to generate a visual KubeDiagram from Helm templates

```

#### Example for Azure cloud provider


```yaml
name: Helm Workflow Azure
on:
  workflow_dispatch:
    inputs:
      environment:
        required: false 
        type: choice
        description: Select Environment name
        options:
          -            # This option is blank beacause we did not given name to helm deploy or you can give this name eg. deploy
          - rollback   # GitHub manual workflow trigger with environment selection for rollback
jobs:
  azure:
    uses: clouddrove/github-shared-workflows/.github/workflows/helm-deploy.yml@master
    secrets:
      AZURE_CREDENTIALS: # Azure Credentials
    with:
      provider: # azure
      azure-cluster-name: # Azure cluster name
      resource-group: # Resource group name
      release-name: # Helm chart realease name
      helm-chart-directory: # Helm chart directory from repo
      # Set parameter is optionals below format support set parameters
      set-parameters:
       # --set image.tag=latest
       # --set replicaCount=3
       # --set service.type=LoadBalancer
      timeout: # Timeout in seconds default values is 120s
      values-file-path: #Values file path
      history-max: # Revision history deafault values is 7
      namespace: # Namespace 
      rollback: ${{ github.event.inputs.environment }}  # Mandetory input do not change this 
```
