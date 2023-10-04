## [Terraform Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/terraform_workflow.yml)

This workflow is used to apply and destroy terraform infra using GitHub Actions. It utilizes the workflows defined in `.github/workflows/terraform_workflow.yml`

#### Usage
This workflow generates an issue before the apply or destroy step with a required plan in it. If we comment "yes", "lgtm" the workflow will proceed to the next step. However, if we comment "deny," the workflow will be canceled.

#### Example of a Terraform workflow for a AWS cloud provider
```yaml
name: terraform workflow
permissions: write-all
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/terraform_workflow.yml@master
    with:
        provider:           # aws
        working_directory:  # Specify terraform code directory in repo
        var_file:           # name of tfvar file e.g "variable.tfvar"
        aws_region:         # specify region eg. us-east-2
        approvers:          # Assignee name for approve apply or destroy step
        minimum-approvals:  # Minimum number of approvals required to progress the workflow, deafault value is 1
        terraform_version:  # Specify terraform version e.g 1.3.6
        destroy:            # If the value is set to true, the workflow proceeds to the destroy step. However, the default value is false
     secrets:
        AWS_ACCESS_KEY_ID:  # Specify AWS Access key ID
        AWS_SECRET_ACCESS_KEY: # Specify AWS Secret Access key ID
        AWS_SESSION_TOKEN:  # Specify Session ID
        env-vars: |         # Specify env variables in following format
               key1=value1
               key2=value2

```

#### Example of a Terraform workflow for a Azure cloud provider
```yaml
name: terraform workflow
permissions: write-all
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/terraform_workflow.yml@master
    with:
        provider:           # azurerm
        working_directory:  # Specify terraform code directory in repo
        var_file:           # Name of tfvar file e.g "variable.tfvar"
        approvers:          # Assignee name for approve apply or destroy step
        minimum-approvals:  # Minimum number of approvals required to progress the workflow, deafault value is 1
        terraform_version:  # Specify terraform version e.g 1.3.6
        destroy:            # If the value is set to true, the workflow proceeds to the destroy step. However, the default value is false
     secrets:
        AZURE_CREDENTIALS:  # Specify Azure credentilas
        env-vars: |         # Specify env variables in following format
               key1=value1
               key2=value2
```

#### Example of a Terraform workflow for a Digitalocean cloud provider
```yaml
name: terraform workflow
permissions: write-all
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/terraform_workflow.yml@master
    with:
        provider:           # digitalocean
        working_directory:  # Specify terraform code directory in repo
        var_file:           # Name of tfvar file e.g "variable.tfvar"
        approvers:          # Assignee name for approve apply or destroy step
        minimum-approvals:  # Minimum number of approvals required to progress the workflow, deafault value is 1
        terraform_version:  # Specify terraform version e.g 1.3.6
        destroy:            # If the value is set to true, the workflow proceeds to the destroy step. However, the default value is false
     secrets:
      DIGITALOCEAN_ACCESS_TOKEN:       # Digitalocean token
      env-vars: |                      # Specify env variables in following format
             key1=value1
             key2=value2
```

#### Example of a Terraform workflow for a GCP cloud provider
```yaml
name: terraform workflow
permissions: write-all
on:
  push:
    branches: [ master ]
  pull_request:
  workflow_dispatch:
jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/terraform_workflow.yml@master
    with:
        provider:           # gcp
        working_directory:  # Specify terraform code directory in repo
        var_file:           # Name of tfvar file e.g "variable.tfvar"
        approvers:          # Assignee name for approve apply or destroy step
        minimum-approvals:  # Minimum number of approvals required to progress the workflow, deafault value is 1
        terraform_version:  # Specify terraform version e.g 1.3.6
        destroy:            # If the value is set to true, the workflow proceeds to the destroy step. However, the default value is false
     secrets:
      GCP_SA_KEY:           # GCP service account Secret access key
      env-vars: |           # Specify env variables in following format
             key1=value1
             key2=value2
```
