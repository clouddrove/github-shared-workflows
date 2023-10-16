## [Deploy Cloudformation Stacket & Stackset-instances](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/deploy-cloudformation-stackset.yml)
 The process starts with the creation of a shared workflow template. This template contains CloudFormation resource definitions, parameter declarations, and other configuration settings that are commonly used across multiple projects or environments. It serves as a blueprint for the infrastructure you want to create. `.github/workflows/deploy-cloudformation-stackset.yml`

#### Usage

- In this workflow we added multiple parameters like S3 bucket for source code, stack-parameters, account-ids, stackset-name using parameters we overrides from called.yml as we defined below.
- In this workflow we provide S3 Object URL where your code & template file located and deploy stackset and stackset-instances 
- Most important thing is we centrally manage stacks of every account's using stackset

#### Key Points:
 In this workflow we added steps like for the below conditions:

 - If stackset are not-Exists then Create a new **stackset**
 - If stackset are Exist then Updating a **stackset**
 - If stackset-instance is not-Exist then Create a new **stackset-instance**
 - If stackset-instance is Exist then Updating a **stackset-instance**

#### Example

```yaml      
name: Cloudformation stack-set               
on:
  push:
    branches: main
  workflow_dispatch:

permissions:            
  id-token: write  
  contents: read   

jobs:
  deploy-cf-stackset:
    uses: clouddrove/github-shared-workflows/.github/workflows/deploy-cloudformation-stackset.yml@master
    with:
      aws-region:                         # aws-configure region add, where you need stackset 
      stackset-instance-region:           # region add where you need stacks
      stack-set-name:                     # name of stack-set    ( same name apply for stackset & instances )
      template-url:                       # S3 bucket Object URL add where template file is located
      OrganizationalUnitIds: ""           # deployment targets OrganizationalUnitIds
      account-ids:                        # deployment targets add master account ids where you deploying stacksets
      parameter-overrides:                # use this format (ParameterKey=ABC,ParameterValue=XXX ParameterKey=XYZ,ParameterValue=XXX)
      permission-model:                   # SELF_MANAGED & SERVICE_MANAGED add here
      auto-deployment-enabled: false      # for SELF_MANAGED-false & SERVICE_MANAGED-true
      RetainStacksOnAccountRemoval: false # for SELF_MANAGED-false & SERVICE_MANAGED-true
      administration-role-arn:            # administration AWSControlTowerStackSetRole ARN add here
      execution-role-name:                # child account AWSControlTowerExecution role name add here

    secrets:
      AWS_ROLE_TO_ASSUME:                # Add AWS OIDC role ARN
      AWS_ACCESS_KEY_ID:                 # Add AWS credentials
      AWS_SECRET_ACCESS_KEY: 
      AWS_SESSION_TOKEN:        
```