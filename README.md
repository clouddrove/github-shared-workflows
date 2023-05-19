<h1 align="center">GitHub-Shared-Workflows</h1>

## 🚀 Table Of Content
1. [**SST Workflow**](https://github.com/clouddrove/github-shared-workflows/tree/issue_357#sst-workflow)   
2. [**Helm Workflow**](https://github.com/clouddrove/github-shared-workflows/tree/issue_357#helm-workflow)
   * [**Example for AWS cloud provider**](https://github.com/clouddrove/github-shared-workflows/tree/issue_357#example-for-aws-cloud-provider)
   * [**Example for Azure cloud provider**](https://github.com/clouddrove/github-shared-workflows/tree/issue_357#example-for-aws-cloud-provider) 
3. [**Docker Workflow**](https://github.com/clouddrove/github-shared-workflows/tree/issue_357#docker-workflow)
   * [**Example for scan and push docker image on Dockerhub**](https://github.com/clouddrove/github-shared-workflows/tree/issue_357#example-for-scan-and-push-docker-image-on-dockerhub)
   * [**Example for scan and push docker image on ECR**](https://github.com/clouddrove/github-shared-workflows/tree/issue_357#example-for-scan-and-push-docker-image-on-ecr)



## [SST Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/sst_workflow.yml)

This workflow is used to deploy serverless stack (SST) application on AWS environment. Workflows have been added in `.github/workflows/sst_workflow.yml`.

#### Usage
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
    secrets:
      AWS_ACCESS_KEY_ID: # AWS Access Key ID for preview
      AWS_SECRET_ACCESS_KEY: # AWS Secret Access Key for preview
    with:
      app-env: # preview                  
      working-directory: # specify your working folder from repo

  staging:
    if: ${{ github.base_ref == 'stage' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    secrets:
      AWS_ACCESS_KEY_ID: # AWS Access Key ID for Stage
      AWS_SECRET_ACCESS_KEY: # AWS Secret Access Key for stage
    with:
      app-env: # stage                      
      working-directory: # specify your working folder from repo

  production:
    if: ${{ github.base_ref == 'master' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    secrets:
      AWS_ACCESS_KEY_ID: # AWS Access Key ID for prod
      AWS_SECRET_ACCESS_KEY: # AWS Secret Access Key for prod
    with:
      app-env: # prod                   
      working-directory: # specify your working folder from repo
```

## [Helm Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/helm.yml)

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
          -            # This option is blank beacause we did not given name to helm deploy or you can give this name eg. deploy
          - rollback   # GitHub manual workflow trigger with environment selection for rollback
jobs:
  aws:
    uses: clouddrove/github-shared-workflows/.github/workflows/helm.yml@master
    secrets:
      AWS_ACCESS_KEY_ID: # AWS Access Key ID
      AWS_SECRET_ACCESS_KEY: # AWS Secret Access Key ID
    with:
      provider: # aws 
      aws-region: # AWS region 
      helm-chart-directory: # Helm chart directory from repo
      eks-cluster-name: # EKS cluster name 
      release-name: # Helm chart realease name
      helm-chart-directory: # Helm chart directory from repo
      # Set parameter is optionals below format support set parameter
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
    uses: clouddrove/github-shared-workflows/.github/workflows/helm.yml@master
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

## Docker Workflow
#### [1. Docker Scanner workflow reference](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/docker-scanner.yml)
#### [2. Docker push workflow reference](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/docker.yml)

This workflow scans the Docker image locally before pushing it to the Docker registry. Workflows have been added in `.github/workflows/docker-scanner.yml`.

#### Usage
The following workflow can build and scan a Docker image locally, providing vulnerability results under the code scanning section of the security tab. It also allows you to choose which vulnerability should block the workflow before pushing the Docker image to the Docker registry this workflow support DOCKERHUB, ECR or both.

#### Example for scan and push docker image on Dockerhub

```yaml
name: Docker Workflow
# This permission are helpful for pushing vulnerability in security tab
permissions:
  actions: read
  contents: read
  security-events: write
  statuses: write

on:
  workflow_dispatch:

jobs:
  docker-scanner:
    uses: clouddrove/github-shared-workflows/.github/workflows/docker-scanner.yml@master
    with:
      severity: # which vulnerability should disable the workflow before pusing image to registry. eg. 'HIGH,CRITICAL,MEDIUM,LOW'

  docker-push:
    needs: docker-scanner  
    if: ${{ success() && needs.docker-scanner.result == 'success' }}   # This condition start this docker push workflow on succesfull scanning of docker image
    uses: clouddrove/github-shared-workflows/.github/workflows/docker.yml@master
    secrets:
      DOCKERHUB_USERNAME: # Dockerhub username
      DOCKERHUB_PASSWORD: # Dockerhub password
    with:
      registry: # DOCKERHUB
      images: # dockerhub repository name
      IMAGE_TAG: # image tag eg. ${{ github.run_number }}
```

#### Example for scan and push docker image on ECR

```yaml
name: Docker Workflow
# This permission are helpful for pushing vulnerability in security tab
permissions:
  actions: read
  contents: read
  security-events: write
  statuses: write

on:
  workflow_dispatch:

jobs:
  docker-scanner:
    uses: clouddrove/github-shared-workflows/.github/workflows/docker-scanner.yml@master
    with:
      severity: # which vulnerability should disable the workflow before pusing image to registry. eg. 'HIGH,CRITICAL,MEDIUM,LOW'

  docker-push:
    needs: docker-scanner
    if: ${{ success() && needs.docker-scanner.result == 'success' }}   # This condition start this docker push workflow on succesfull scanning of docker image
    uses: clouddrove/github-shared-workflows/.github/workflows/docker.yml@master
    secrets:
      AWS_ACCESS_KEY_ID: # AWS Access Key ID
      AWS_SECRET_ACCESS_KEY: # AWS Secret Access Key ID
    with:
      registry: # 'ECR'
      ECR_REPOSITORY: # ECR Repository name
      aws-region: # AWS region
      IMAGE_TAG: # image tag eg. ${{ github.run_number }}
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
