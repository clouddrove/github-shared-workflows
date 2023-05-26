<h1 align="center">GitHub-Shared-Workflows</h1>

<p align="center">
<img src=./img/logo.png>
</p>


This GitHub Shared Workflows offers benefits such as code reusability, consistent processes, simplified maintenance, easy updates and upgrades and easier troubleshooting. By adopting shared workflows, we can make workflows reusable and anyone with access to the Shared workflow can then call the Shared workflow from another workflow when require. This repository contains GitHub Shared Workflows that build, security scanning, and deployment processes for SST Application, Docker images, Helm charts and more. For more information please follow below [Table of Content](https://github.com/clouddrove/github-shared-workflows/tree/master#-table-of-content).

## Example
```yaml
jobs:
  staging: # Job name
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    secrets:
      SECRET_1:
      SECRET_2: 
    with:
      input_1:                 
      input_2:
```
Above example calls SST workflow from `clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master` and used in the jobs as per our requirement for deployment.

## 🚀 Table Of Content
1. [SST Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/sst.md)   
2. [Helm Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/helm.md)
   * [Example for AWS cloud provider](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/helm.md#example-for-aws-cloud-provider)
   * [Example for Azure cloud provider](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/helm.md#example-for-azure-cloud-provider) 
3. [Docker Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/docker.md)
   * [Example for scan and push docker image on Dockerhub](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/docker.md#example-for-scan-and-push-docker-image-on-dockerhub)
   * [Example for scan and push docker image on ECR](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/docker.md#example-for-scan-and-push-docker-image-on-ecr)

## Feedback 
If you come accross a bug or have any feedback, please log it in our [issue tracker](https://github.com/clouddrove/github-shared-workflows/issues), or feel free to drop us an email at [hello@clouddrove.com](mailto:hello@clouddrove.com).

If you have found it worth your time, go ahead and give us a ★ on [our GitHub](https://github.com/clouddrove/github-shared-workflows)!

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
