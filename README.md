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
<a href="https://github.com/clouddrove/github-shared-workflows/stargazers">
  <img src="https://img.shields.io/github/stars/clouddrove/github-shared-workflows?style=social" alt="GitHub stars">
</a>
<a href="https://github.com/clouddrove/github-shared-workflows/forks">
  <img src="https://img.shields.io/github/forks/clouddrove/github-shared-workflows?style=social" alt="GitHub forks">
</a>
<a href="https://github.com/clouddrove/github-shared-workflows/issues">
  <img src="https://img.shields.io/github/issues/clouddrove/github-shared-workflows" alt="GitHub issues">
</a>
<a href="https://github.com/clouddrove/github-shared-workflows/pulls">
  <img src="https://img.shields.io/github/issues-pr/clouddrove/github-shared-workflows" alt="GitHub pull requests">
</a>
<a href="https://github.com/clouddrove/github-shared-workflows/actions">
  <img src="https://img.shields.io/github/actions/workflow/status/clouddrove/github-shared-workflows/ci.yml?label=CI" alt="CI Status">
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

> ⚠️ **Breaking Changes Notice:** Version 2.0.0 introduces significant breaking changes including workflow file renames. Please review the [CHANGELOG.md](./CHANGELOG.md#200---2026-02-11) breaking changes section before upgrading.

**A comprehensive collection of 40+ reusable GitHub Actions workflows** for Terraform, Docker, Kubernetes, Helm, CloudFormation, security scanning, PR automation, and more. Simplify your CI/CD pipeline with battle-tested workflows that follow best practices.

### ✨ Key Features

- 🎯 **40+ Production-Ready Workflows** - Covering all major DevOps use cases
- 🔄 **Reusable & Maintainable** - Update once, use everywhere
- 📚 **Comprehensive Documentation** - Every workflow has detailed docs with examples
- 🏷️ **Organized by Prefix** - Easy to find workflows by category
- 🔒 **Security-First** - Built-in security scanning and best practices
- ☁️ **Multi-Cloud Support** - AWS, Azure, GCP, DigitalOcean
- 🚀 **Quick Start** - Get started in minutes with our [Quick Start Guide](./QUICKSTART.md)

### 📊 Repository Stats

- **41 Workflows** across 10+ categories
- **32 Documentation Files** with real-world examples
- **5,400+ Lines** of battle-tested workflow code
- **Prefix-Based Organization** for easy discovery

## 🎯 Quick Start

See our [Quick Start Guide](./QUICKSTART.md) for common use cases and examples.

## 📖 How to Use Shared Workflows
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

<!-- ## 🚀 Table Of Content -->
<!-- 1. [SST Workflow](./docs/01.sst.md)
2. [Helm Workflow](./docs/02.helm.md)
   * [Example for AWS cloud provider](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/02.helm.md#example-for-aws-cloud-provider)
   * [Example for Azure cloud provider](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/02.helm.md#example-for-azure-cloud-provider) 
3. [Docker Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/03.docker.md)
   * [Example for scan and push docker image on Dockerhub](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/03.docker.md#example-for-scan-and-push-docker-image-on-dockerhub)
   * [Example for scan and push docker image on ECR](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/03.docker.md#example-for-scan-and-push-docker-image-on-ecr)
4. [Auto Assign Assignee Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/04.auto-assignee.md)
5. [Terraform Checks Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/05.tf-checks.md)
   * [Example for terraform checks with azure cloud](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/05.tf-checks.md#example-for-terraform-checks-with-azure-cloud)
   * [Example for terraform checks with aws cloud](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/0.5.tf-checks.md#example-for-terraform-checks-with-aws-cloud)
   * [Example for terraform checks with digitalocean cloud](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/05.tf-checks.md#example-for-terraform-checks-with-digitalocean-cloud)
6. [Terraform Lint Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/06.terraform-lint.md)
7. [Terraform Checks Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/07.tf-checks.md)
8. [Checkov Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/08.checkov.md)
9. [Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/09.terraform_workflow.md)
10. [Infracost workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/10.infracost.md)
11. [ Deploy Cloudformation Stack workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/11.deploy-cloudformation.md)
12. [ Deploy Cloudformation Stackset workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/12.deploy-cloudformation-stackset.md)
13. [ Readme Generation workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/13.readme.md)
14. [ AWS SSM Send Command workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/14.AWSSSMSendCommand.md)
15. [ Remote SSH Command workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/15.RemoteSSHCommand.md)
16. [ Prowler workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/16.prowler.md)
17. [Stale PR workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/17.stale-pr.md)
18. [PR Checks workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/18.pr-checks.md)
19. [Tag Release workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/19.tag-release.md)
20. [Terraform PR plan Diff workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/20.tf-pr-checks.md)
21. [Docker-scout workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/21.docker-scout.md)
22. [Lock thread workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/22.lock.md)
23. [Powerpipe workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/23.powerpipe.md)
24. [Prowler workflow AWS](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/24.prowlerAWS.md)
25. [Prowler workflow GCP](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/25.prowlerGCP.md)
26. [Smurf-Docker-Helm Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/26.smurf-docker-helm.md)
27. [Smurf Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/27.smurf-terraform.md)
28. [Terraform Module Tag Release Workflow (Shared)](https://github.com/clouddrove/github-shared-workflows/blob/master/docs/28.terraform-module-tag-release.md) -->

## 📊 Workflow Statistics

| Category | Count | Workflows |
|----------|-------|-----------|
| **Terraform** | 9 | Checks, Lint, Workflow, Drift, PR Checks, Smurf, Monorepo Tag Release, STF Checks |
| **Docker** | 4 | Build Push, Scanner, Scout, Smurf Helm |
| **PR Automation** | 7 | Auto Assignee, Auto Merge, Checks, Claude Review, Gemini Review, Gitleaks, Lock, Stale |
| **Security** | 5 | Checkov, Prowler, Powerpipe, TFSec |
| **AWS** | 3 | Prowler, SSM Send Command, Remote SSH Command |
| **CloudFormation** | 3 | Deploy, Deploy StackSet, Lint |
| **Release** | 3 | Tag, Changelog, Changelog Internal |
| **GCP** | 1 | Prowler |
| **Helm** | 1 | Deploy |
| **Notification** | 1 | Slack |
| **Other** | 3 | Infracost, README Generation, SST |

**Total: 41 Production-Ready Workflows**

## 🚀 Table of Contents

### AWS Workflows
- [AWS Prowler Workflow](./docs/aws-prowler.md)
- [AWS Remote SSH Command Workflow](./docs/aws-remote-ssh-command.md)
- [AWS SSM Send Command Workflow](./docs/aws-ssm-send-command.md)

### CloudFormation Workflows
- [CloudFormation Deploy Stack Workflow](./docs/cf-deploy.md)
- [CloudFormation Deploy StackSet Workflow](./docs/cf-deploy-stackset.md)

### Docker Workflows
- [Docker Build Push Workflow](./docs/docker-build-push.md)
  * [Example for scan and push docker image on Dockerhub](./docs/docker-build-push.md#example-for-scan-and-push-docker-image-on-dockerhub)
  * [Example for scan and push docker image on ECR](./docs/docker-build-push.md#example-for-scan-and-push-docker-image-on-ecr)
- [Docker Scout Workflow](./docs/docker-scout.md)
- [Docker Smurf Helm Workflow](./docs/docker-smurf-helm.md)

### GCP Workflows
- [GCP Prowler Workflow](./docs/gcp-prowler.md)

### Helm Workflows
- [Helm Deploy Workflow](./docs/helm-deploy.md)
  * [Example for AWS cloud provider](./docs/helm-deploy.md#example-for-aws-cloud-provider)
  * [Example for Azure cloud provider](./docs/helm-deploy.md#example-for-azure-cloud-provider)

### Notification Workflows
- [Slack Notification Workflow](./docs/notify-slack.md)

### PR Workflows
- [PR Auto Assignee Workflow](./docs/pr-auto-assignee.md)
- [PR Checks Workflow](./docs/pr-checks.md)
- [PR Claude Review Workflow](./docs/pr-claude-review.md)
- [PR Gemini Review Workflow](./docs/pr-gemini-review.md)
- [PR Gitleaks Scan Workflow](./docs/pr-gitleaks-scan.md)
- [PR Lock Workflow](./docs/pr-lock.md)
- [PR Stale Workflow](./docs/pr-stale.md)

### Release Workflows
- [Release Tag Workflow](./docs/release-tag.md)

### Security Workflows
- [Security Checkov Workflow](./docs/security-checkov.md)
- [Security Powerpipe Workflow](./docs/security-powerpipe.md)
- [Security Prowler Workflow](./docs/security-prowler.md)

### Terraform Workflows
- [Terraform Checks Workflow](./docs/tf-checks.md)
  * [Example for terraform checks with azure cloud](./docs/tf-checks.md#example-for-terraform-checks-with-azure-cloud)
  * [Example for terraform checks with aws cloud](./docs/tf-checks.md#example-for-terraform-checks-with-aws-cloud)
  * [Example for terraform checks with digitalocean cloud](./docs/tf-checks.md#example-for-terraform-checks-with-digitalocean-cloud)
- [Terraform Smurf Checks](./docs/stf-checks.md)
- [Terraform Drift Workflow](./docs/tf-drift.md)
- [Terraform Lint Workflow](./docs/tf-lint.md)
- [Terraform Monorepo Tag Release Workflow](./docs/tf-monorepo-tag-release.md)
- [Terraform PR Checks Workflow](./docs/tf-pr-checks.md)
- [Terraform Smurf Workflow](./docs/tf-smurf.md)
- [Terraform Workflow](./docs/tf-workflow.md)

### Other Workflows
- [CI/CD Pipeline Workflow](./docs/ci.md)
- [Infracost Workflow](./docs/infracost.md)
- [README Generation Workflow](./docs/readme.md)
- [SST Workflow](./docs/sst.md)

### YAML Lint Workflows
- [YAML Lint Workflow](./.github/workflows/yml-lint.yml)
- [YAML Lint Internal Workflow](./.github/workflows/yml-lint-internal.yml)

---

## 📚 Additional Resources

- ⚠️ [Breaking Changes](./CHANGELOG.md#200---2026-02-11) - Migration guide for version 2.0.0
- 📖 [Quick Start Guide](./QUICKSTART.md) - Get started in 5 minutes
- 📋 [Workflow Catalog](./WORKFLOW_CATALOG.md) - Complete workflow index
- 🎯 [Best Practices](./BEST_PRACTICES.md) - Learn workflow best practices
- 🗺️ [Roadmap](./ROADMAP.md) - See what's coming next
- 🤝 [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- 🔒 [Security Policy](./.github/SECURITY.md) - Security reporting

## 🌟 Why Choose This Repository?

| Feature | This Repo | Others |
|---------|-----------|--------|
| **Workflow Count** | 40+ workflows | Usually 5-10 |
| **Documentation** | Comprehensive with examples | Often minimal |
| **Organization** | Prefix-based, alphabetical | Often unorganized |
| **Multi-Cloud** | AWS, Azure, GCP, DigitalOcean | Usually single cloud |
| **Security** | Built-in scanning workflows | Often missing |
| **Maintenance** | Active updates | Varies |
| **Examples** | 2-3 per workflow | Often none |
| **Best Practices** | Documented guide | Rarely provided |

## 🎓 Learning Resources

- 📺 **Video Tutorials** - Coming soon
- 📝 **Blog Posts** - [CloudDrove Blog](https://blog.clouddrove.com)
- 💬 **Community** - [GitHub Discussions](https://github.com/clouddrove/github-shared-workflows/discussions)
- 📚 **Documentation** - Comprehensive guides for each workflow

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

- 🐛 [Report a Bug](https://github.com/clouddrove/github-shared-workflows/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/clouddrove/github-shared-workflows/issues/new?template=feature_request.md)
- 📝 [Submit a Workflow](https://github.com/clouddrove/github-shared-workflows/compare)

## 🔒 Security

Please review our [Security Policy](./.github/SECURITY.md) before reporting security vulnerabilities.

## 📈 Why Use Shared Workflows?

| Benefit | Description |
|---------|-------------|
| **Consistency** | Same workflow behavior across all repositories |
| **Maintainability** | Update once, benefit everywhere |
| **Best Practices** | Pre-configured with security and performance optimizations |
| **Time Saving** | No need to write workflows from scratch |
| **Documentation** | Comprehensive docs with examples for every workflow |

## 🌟 Featured Workflows

<details>
<summary><b>🔐 Security Workflows</b> - Protect your infrastructure</summary>

- [Security Checkov](./docs/security-checkov.md) - IaC security scanning
- [Security Prowler](./docs/security-prowler.md) - Cloud security assessment
- [Security Powerpipe](./docs/security-powerpipe.md) - Compliance checking
- [Security TFSec](./docs/tf-tfsec.md) - Terraform security scanner

</details>

<details>
<summary><b>☁️ Infrastructure as Code</b> - Deploy with confidence</summary>

- [Terraform Workflow](./docs/tf-workflow.md) - Full Terraform lifecycle management
- [Terraform Smurf Checks](./docs/stf-checks.md) - Validation and testing
- [CloudFormation Deploy](./docs/cf-deploy.md) - AWS CloudFormation deployment

</details>

<details>
<summary><b>🐳 Container Workflows</b> - Build and deploy containers</summary>

- [Docker Build Push](./docs/docker-build-push.md) - Build and push to registries
- [Docker Scout](./docs/docker-scout.md) - Container security scanning
- [Helm Deploy](./docs/helm-deploy.md) - Kubernetes deployments

</details>

## 📚 Documentation

- 📖 [Quick Start Guide](./QUICKSTART.md) - Get started in 5 minutes
- 📋 [Full Workflow List](./README.md#-table-of-contents) - Browse all workflows
- 🔧 [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- 🔒 [Security Policy](./.github/SECURITY.md) - Security reporting

## 💬 Community & Support

- 💬 [GitHub Discussions](https://github.com/clouddrove/github-shared-workflows/discussions) - Ask questions and share ideas
- 🐛 [Issue Tracker](https://github.com/clouddrove/github-shared-workflows/issues) - Report bugs and request features
- 📧 [Email Support](mailto:hello@clouddrove.com) - hello@clouddrove.com
- ⭐ [Star Us](https://github.com/clouddrove/github-shared-workflows) - Show your support!

## 🙏 Acknowledgments

Thank you to all [contributors](./README.md#-contributors) who have helped make this project better!

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

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
