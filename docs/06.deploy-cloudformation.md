## [Deploy Cloudformation Stack](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/deploy-cloudformation.yml)
 The process starts with the creation of a shared workflow template. This template contains CloudFormation resource definitions, parameter declarations, and other configuration settings that are commonly used across multiple projects or environments. It serves as a blueprint for the infrastructure you want to create. `.github/workflows/deploy-cloudformation.yml`

#### Usage

- Using this workflow we just defined cloudformation template file and deploy your application.
- In this workflow we added multiple parameters like S3 bucket for source code, stack-parameters and parameters we overrides from called.yml as we defined below.
- In this workflow most beneficial part is we upload our source code to S3 bucket and from there your template take code and deploy the lambda function.

#### Example

```yaml
name: Cloudformation stack deploy       
on:
  push:
    branches: [ main ]
  workflow_dispatch:
jobs:
  cloudformation-stack-deploy:
    uses: clouddrove/github-shared-workflows/.github/workflows/deploy-cloudformation.yml@master
    with:  
      s3-bucket:               # S3 Bucket name where code is stored
      bucket-prefix:           # S3 Bucket prefix/folder name where you push the zip file
      aws-region:              # Aws region add if you want else default will be used (us-east-1)
      stack-name:              # Stack name add here
      template-path:           # Add repo name & template file name ( ex- Repo-name/template.yml)
      GitHub-repo-name:        # GitHub-repo-name where your src code and template are located
      GitHub-branch:           # GitHub Repo branch where your src code and template are located
      organization-name:       # GitHub Organization name where your src code and template are located
      code-folder:             # Add folder name where your code is located ex-(.ts/.py) else default used (src)
      zip-file-name:           # Add zip file name which you uploading to S3 bucket after converting code to zip (ex- myfile.zip).
      parameter-overrides:     # add your overrides parameters here ( ex- VpcName=MyCustomVPC, Cidr=10.0.0.0/16 )
    secrets:
      AWS_ACCESS_KEY_ID:  
      AWS_SECRET_ACCESS_KEY:   # Add AWS credentials
      AWS_SESSION_TOKEN: 
      GITHUB:                  # Add GitHub token        
```