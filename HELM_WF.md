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

