<p align="center"> <img src="https://camo.githubusercontent.com/a47ec6a3814b0a78105e9b1130cea653cbf319913f4d321f7512a60c3a4c1df0/68747470733a2f2f63646e2e73766172756e2e6465762f67682f616374696f6e732d736d616c6c2e706e67" width="100" height="100"></p>

<h1 align="center">GitHub Shared Workflows</h1>

<p align="center">
GitHub shared workflow defines a workflow that we can use in multiple repos with a simple structure.
</p>

<p align="center">
<a href="LICENSE">
  <img src="https://img.shields.io/badge/License-APACHE-blue.svg" alt="Licence">
</a>
<a href="https://docs.github.com/en/actions/using-workflows/reusing-workflows">
  <img src="https://img.shields.io/badge/shared-workflow-green" alt="ref">
</a>
</p>

<p align="center">
<a href='https://facebook.com/sharer/sharer.php?u=https://github.com/clouddrove/github-shared-workflows'>
  <img title="Share on Facebook" src="https://user-images.githubusercontent.com/50652676/62817743-4f64cb80-bb59-11e9-90c7-b057252ded50.png" />
</a>
<a href='https://www.linkedin.com/shareArticle?mini=true&title=Github+Shared+Workflows&url=https://github.com/clouddrove/github-shared-workflows'>
  <img title="Share on LinkedIn" src="https://user-images.githubusercontent.com/50652676/62817742-4e339e80-bb59-11e9-87b9-a1f68cae1049.png" />
</a>
<a href='https://twitter.com/intent/tweet/?text=Github+Shared+Workflows&url=https://github.com/clouddrove/github-shared-workflows'>
  <img title="Share on Twitter" src="https://user-images.githubusercontent.com/50652676/62817740-4c69db00-bb59-11e9-8a79-3580fbbf6d5c.png" />
</a>
</p>

---

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
4. [Auto Assign Assignee Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/auto-assignee.md)
5. [Terraform Checks Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/terraform-checks.md)
   * [Example for terraform checks with azure cloud](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/terraform-checks.md#example-for-terraform-checks-with-azure-cloud)
   * [Example for terraform checks with aws cloud](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/terraform-checks.md#example-for-terraform-checks-with-aws-cloud)
   * [Example for terraform checks with digitalocean cloud](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/terraform-checks.md#example-for-terraform-checks-with-digitalocean-cloud)
6. [Terraform Lint Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/terraform-lint.md)
7. [Terraform Checks Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/terraform-checks.md)
7. [Checkov Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/checkov.md)
8. [Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/terraform_workflow.md)
9. [Infracost workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/infracost.md)
10. [ Deploy Cloudformation Stack workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/deploy-cloudformation.md)
11. [ Deploy Cloudformation Stackset workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/deploy-cloudformation-stackset.md)
12. [ Readme Generation workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/readme.md)

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
