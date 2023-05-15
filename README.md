<h1 align="center">github-shared-workflows</h1>

# SST Workflow
This GitHub Actions workflow is designed to deploy an AWS Serverless Stack (SST) app to an AWS environment based on inputs provided to the workflow. The environment can be specified using the app-env input, and the working directory can be specified using the working-directory input.

## Prerequisites

Before using this workflow, make sure you have the following:

- An AWS account with appropriate permissions to deploy and remove SST apps
- AWS CLI should be installed and configured with appropriate IAM user credentials
- AWS Access Key ID and Secret Access Key with sufficient permissions
- The Serverless Framework CLI, Node.js, and Yarn installed on the runner


---
## Workflow Inputs

The workflow accepts the following inputs:

- __app-env__ (optional): Specifies the application environment. It can be set to `preview`, `prod`, or `stage`.
- __working-directory__ (required): Specifies the working directory in the repository where the code resides.

## Secrets

The workflow requires the following secrets to be set in the repository:

- `aws-access-key-id`: AWS Access Key ID for configuring AWS credentials.
- `aws-secret-access-key`: AWS Secret Access Key for configuring AWS credentials.

## Jobs

The workflow consists of a single job named "deploy" that runs on an Ubuntu 20.04 machine.

### Job Environment

The job environment is configured based on the following variables:

- `name`: The name of the environment is set to the branch name associated with the pull request or the commit.
- `url`: The API endpoint URL is obtained from the `API_ENDPOINT_URL` environment variable.

### Steps

The job comprises the following steps:
__1. Checkout git repo__  

Checkout the repository and triggers the GitHub Action  

__2. Configure AWS Credentials__  

This step configures AWS credentials using __aws-access-key-id__ and __aws-secret-access-key__.  

__3. Install dependencies__  

This step installs all dependencies of the Application by running ___yarn install___ command.  

__5. Extract branch name__  

This step Extract the branch name with its standard name. If there is any other symbol except __"-"__ it will remove it and keep only __"-"__ symbol.  

__6. Deploy and get API endpoint__  

This step deployes application on AWS Lambda in preview environment and gives __endpoint__ to access the Application so that we can preview it.  

__7. Destroy SST App for Preview app environment__  

This step destroy the SST App in Preview app environment once it is merge to __prod__ and __stage__ environment.

## Example

To use this workflow, create a new GitHub Actions workflow file in your repository with the following YAML code:

'''json
Here goes your json object definition
'''








