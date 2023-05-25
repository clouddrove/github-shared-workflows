<h1 align="center">GitHub-Shared-Workflows</h1>
<p align="center">
GitHub shared workflow defines a workflow that we can use in multiple repos with a simple structure.
</p>

This repo offers to using a workflow with a simple calling structure and proper documentation. This shared workflow feature can overcome the issue of upgrading hundreds of workflows whenever any new updation is required. In this repo, we have many kinds of workflows related to Terraform, Kubernetes, Helm, SST, and regular workflows like maintain changelog, auto assignee, and many more.

## How shared workflow use
```yaml
jobs:
  staging: # Job name
    uses: clouddrove/github-shared-workflows/.github/workflows/example.yml@master
    secrets:
      SECRET_1:
      SECRET_2: 
    with:
      input_1:                 
      input_2:
```
Above example is just a simple example to call workflow from github shared workflow to your workflow and used in the jobs as per your requirements.

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
