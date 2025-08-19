## [SST Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/sst_workflow.yml)

This workflow is used to deploy or destroy serverless stack (SST) application on AWS environment. Workflows have been added in `.github/workflows/sst_workflow.yml`.

#### Usage
The following workflow can be used to deploy the SST application in the staging environment when a pull request is generated on the base branch named "master". It will deploy the SST application in the production environment when a new tag is released. Additionally, it will destroy the preview environment when a pull request is closed, merged, and labeled as "destroy".

Inputs:
| Input name | Type | Required | Default | Comment |
|---|---|---|---|---|
| app-env | string | true |  | Staging or Production |
| preview | string | false | false | If true SST deployed in preview environment |
| working-directory | string | false | ./ | SST code location path |
| stack-name | string | false |  | Specify stack name for deployment |
| yarn-cache | string | false | false | Yarn stores packages in global cache |
| deploy | string | false | true | Plan app stacks or deploy. |
| self-hosted | string | false | true | Deploy stack with github runner or without it. |

Secrets:
| Secret name | Required | Comment |
|---|---|---|
| token | false | GitHub token for environment deletion |
| env-vars |  false | Stack environment variables |
| build-role | true | | AWS authentication role |

```yaml
  staging-workflow:
    if: ${{ github.event.pull_request.base.ref == 'master' }} 
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    with:
      app-env: staging

  production-workflow:
    if: startsWith(github.event.ref, 'refs/tags/v') 
    uses: clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master
    with:
      app-env: production
```


##### Path: `clouddrove/github-shared-workflows/.github/workflows/sst_workflow.yml@master`

Should be used with `on: pull_request`. Includes the following:
1. Adds SST Deployed application link into the description of a pull request.
2. Appends Pull Request number and head branch name for the stage name when the preview environment is set to true.

Handles the following branch naming styles :
- `feature-123`
- `feature_123`
- `feature-123/feature-description`
