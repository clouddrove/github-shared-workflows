<h1 align="center">github-shared-workflows</h1>

## SST Workflow

This workflow is used to deploy serverless stack (SST) application on AWS environment. Workflows have been added in `.github/workflows/sst_workflow.yml`.

Below workflow can be used to deploy SST in preview environment when pull request generated and it destroys the preview environment when pull request closed, merged and labeled as destroy, similarly staging and production is deployed using there defined branches.

```yaml
name: SST Workflow

on:
  pull_request: 
    types: [closed, merged, labeled]
  workflow_dispatch:
jobs:
  preview:
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    with:
      app-env: # preview                  
      working-directory: # specify your working folder from repo
    secrets:
      aws-access-key-id: # AWS Access Key ID for preview
      aws-secret-access-key: # AWS Secret Access Key for preview

  staging:
    if: ${{ github.base_ref == 'stage' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    with:
      app-env: # stage                      
      working-directory: # specify your working folder from repo
    secrets:
      aws-access-key-id: # AWS Access Key ID for stage
      aws-secret-access-key: # AWS Secret Access Key for stage

  production:
    if: ${{ github.base_ref == 'master' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    with:
      app-env: # prod                   
      working-directory: # specify your working folder from repo
    secrets:
      aws-access-key-id: # AWS Access Key ID for prod
      aws-secret-access-key: # AWS Secret Access Key for prod
```

## HELM Workflow
This workflow is used to deploy and rollback Helm charts using GitHub Actions. It utilizes the workflows defined in `.github/workflows/helm.yml`

#### Usage
The helm workflow can be triggered manually using the GitHub Actions workflow dispatch feature. It deploys or rollback Helm charts based on the specified inputs. Additionally, it also performs Helm template and Helm lint operations.

To use the helm Workflow, add the following workflow definition to your `.github/workflows/helm.yml` file:

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
          - 
          - rollback   #GitHub manual workflow trigger with environment selection for rollback

jobs:
  aws:
    uses: clouddrove/github-shared-workflows/.github/workflows/helm.yml@master
    secrets:
      aws-access-key-id: # AWS Access Key ID
      aws-secret-access-key: # AWS Secret Access Key ID
    with:
      provider: # aws
      rollback: ${{ github.event.inputs.environment }}
      aws-region: # AWS region 
      helm-chart-directory: # Helm chart directory from repo
      eks-cluster-name: # EKS cluster name
      namespace: # Namespace 
      release-name: # Helm chart realease name
      set-parameters:  # Set parameter is optionals below format support set parameters you can use 1 format from below options
        --set image.tag=latest
        --set replicaCount=3
        --set service.type=LoadBalancer
      # set-parameters: --set image.tag=latest,replicaCount=7,service.type=LoadBalancer
      timeout: # Timeout in seconds eg. 100s
      values-file-path: #Values file path
      history-max: # Revision history eg. 4 
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
          - 
          - rollback   #GitHub manual workflow trigger with environment selection for rollback
jobs:
  azure:
    uses: clouddrove/github-shared-workflows/.github/workflows/helm.yml@master
    secrets:
      AZURE_CREDENTIALS: # Azure Credentials
    with:
      provider: # azure
      azure-cluster-name: # Azure cluster name
      rollback: ${{ github.event.inputs.environment }}
      helm-chart-directory: # Helm chart directory from repo
      namespace: # Namespace for deploy or rollback
      release-name: # Release name
      set-parameters:  # Set parameter is optionals below format support set parameters you can use 1 format from below options
        --set image.tag=latest
        --set replicaCount=3
        --set service.type=LoadBalancer
      # set-parameters: --set image.tag=latest,replicaCount=7,service.type=LoadBalancer
      timeout: # Timeout in seconds eg. 100s
      values-file-path: # Values file path
      history-max: # Revision history eg. 4 
```

## Feedback 
If you come accross a bug or have any feedback, please log it in our [issue tracker](https://github.com/clouddrove/terraform-azure-aks/issues), or feel free to drop us an email at [hello@clouddrove.com](mailto:hello@clouddrove.com).

If you have found it worth your time, go ahead and give us a ★ on [our GitHub](https://github.com/clouddrove/terraform-azure-aks)!

## About us

At [CloudDrove][website], we offer expert guidance, implementation support and services to help organisations accelerate their journey to the cloud. Our services include docker and container orchestration, cloud migration and adoption, infrastructure automation, application modernisation and remediation, and performance engineering.

<p align="center">We are <b> The Cloud Experts!</b></p>
<hr />
<p align="center">We ❤️  <a href="https://github.com/clouddrove">Open Source</a> and you can check out <a href="https://github.com/clouddrove">our other modules</a> to get help with your new Cloud ideas.</p>

  [website]: https://clouddrove.com
  [github]: https://github.com/clouddrove
  [linkedin]: https://cpco.io/linkedin
  [twitter]: https://twitter.com/clouddrove/
  [email]: https://clouddrove.com/contact-us.html
  [terraform_modules]: https://github.com/clouddrove?utf8=%E2%9C%93&q=terraform-&type=&language=
