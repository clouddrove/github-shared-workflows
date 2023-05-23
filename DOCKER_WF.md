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
