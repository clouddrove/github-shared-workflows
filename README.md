<h1 align="center">github-shared-workflows</h1>

# SST Workflow

## Prerequisites

Before using this workflow, make sure you have the following:

- An AWS account with appropriate permissions to deploy and remove SST apps
- AWS CLI should be installed and configured with appropriate IAM user credentials
- AWS Access Key ID and Secret Access Key with sufficient permissions
- The Serverless Framework CLI, Node.js, and Yarn installed on the runner


---
### workflow_call
#### app-env (Optional)
This step is used to call environment which we are using.
#### working-directory
This step is used to call Working Directory in the Repository.

### secrets
Used to call AWS Access Key ID and AWS Secret Access Key

### Jobs
##### runs-on
Job will run on ubuntu-20.04 runner
#### Deploy SST APP
#### steps
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






