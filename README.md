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
