[![Banner](https://github.com/clouddrove/terraform-module-template/assets/119565952/67a8a1af-2eb7-40b7-ae07-c94cde9ce062)][website]

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
8. [Checkov Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/checkov.md)
9. [Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/terraform_workflow.md)
10. [Infracost workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/infracost.md)
11. [ Deploy Cloudformation Stack workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/deploy-cloudformation.md)
12. [ Deploy Cloudformation Stackset workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/deploy-cloudformation-stackset.md)
13. [ Readme Generation workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/readme.md)
14. [ AWS SSM Send Command workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/AWSSSMSendCommand.md)
15. [ Remote SSH Command workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/RemoteSSHCommand.md)
16. [ Prowler workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/prowler.md)
17. [Stale PR workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/stale-pr.md)
18. [PR Checks workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/pr-checks.md)
19. [Tag Release workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/tag-release.md)

## Feedback 
If you come accross a bug or have any feedback, please log it in our [issue tracker](https://github.com/clouddrove/github-shared-workflows/issues), or feel free to drop us an email at [hello@clouddrove.com](mailto:hello@clouddrove.com).

If you have found it worth your time, go ahead and give us a ★ on [our GitHub](https://github.com/clouddrove/github-shared-workflows)!

## :rocket: Our Accomplishment

We have [*100+ Terraform modules*][terraform_modules] 🙌. You could consider them finished, but, with enthusiasts like yourself, we are able to ever improve them, so we call our status - improvement in progress.

- [Terraform Module Registry:](https://registry.terraform.io/namespaces/clouddrove) Discover our Terraform modules here.

- [Terraform Modules for AWS/Azure Modules:](https://github.com/clouddrove/toc) Explore our comprehensive Table of Contents for easy navigation through our documentation for modules pertaining to AWS, Azure & GCP. 

- [Terraform Modules for Digital Ocean:](https://github.com/terraform-do-modules/toc) Check out our specialized Terraform modules for Digital Ocean.

## Join Our Slack Community

Join our vibrant open-source slack community and embark on an ever-evolving journey with CloudDrove; helping you in moving upwards in your career path.
Join our vibrant Open Source Slack Community and embark on a learning journey with CloudDrove. Grow with us in the world of DevOps and set your career on a path of consistency.

🌐💬What you'll get after joining this Slack community:

- 🚀 Encouragement to upgrade your best version.
- 🌈 Learning companionship with our DevOps squad.
- 🌱 Relentless growth with daily updates on new advancements in technologies.

Join our tech elites [Join Now][slack] 🚀

## ✨ Contributors

Big thanks to our contributors for elevating our project with their dedication and expertise! But, we do not wish to stop there, would like to invite contributions from the community in improving these projects and making them more versatile for better reach. Remember, every bit of contribution is immensely valuable, as, together, we are moving in only 1 direction, i.e. forward. 

<a href="https://github.com/clouddrove/github-shared-workflows/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=clouddrove/github-shared-workflows&max" />
</a>
<br>
<br>

## Explore Our Blogs

 Click [here][blog] :books: :star2:

## Tap into our capabilities
We provide a platform for organizations to engage with experienced top-tier DevOps & Cloud services. Tap into our pool of certified engineers and architects to elevate your DevOps and Cloud Solutions. 

At [CloudDrove][website], has extensive experience in designing, building & migrating environments, securing, consulting, monitoring, optimizing, automating, and maintaining complex and large modern systems. With remarkable client footprints in American & European corridors, our certified architects & engineers are ready to serve you as per your requirements & schedule. Write to us at [business@clouddrove.com](mailto:business@clouddrove.com).

<p align="center">We are <b> The Cloud Experts!</b></p>
<hr />
<p align="center">We ❤️  <a href="https://github.com/clouddrove">Open Source</a> and you can check out <a href="https://registry.terraform.io/namespaces/clouddrove">our other modules</a> to get help with your new Cloud ideas.</p>

  [website]: https://clouddrove.com
  [blog]: https://blog.clouddrove.com
  [slack]: https://www.launchpass.com/devops-talks
  [github]: https://github.com/clouddrove
  [linkedin]: https://cpco.io/linkedin
  [twitter]: https://twitter.com/clouddrove/
  [email]: https://clouddrove.com/contact-us.html
  [terraform_modules]: https://github.com/clouddrove?utf8=%E2%9C%93&q=terraform-&type=&language=
