# github-shared-workflows

## SST Workflow

### workflow_call
#### app-env (Optional)
This step is used to call environment which we are using.
#### working-directory
This step is used to call Working Directory in the Repository.

### secrets
Used to call AWS Access Key ID and AWS Secret Access Key

### Jobs
#####runs-on
Job will run on ubuntu-20.04 runner
####Deploy SST APP
#####steps
1. Checkout git repo
Checkout the repository and triggers the GitHub Action
2. Configure AWS Credentials
This step configures AWS credentials using __aws-access-key-id__ and __aws-secret-access-key__.
3. Install dependencies
This step installs all dependencies of the Application by running ___yarn install___ command.
5. Extract branch name
This step Extract the branch name with its standard name. If there is any other symbol except __"-"__ it will remove it and keep only __"-"__ symbol.
5. Deploy and get API endpoint
This step deployes application on AWS Lambda in preview environment and gives __endpoint__ to access the Application so that we can preview it.
6. Destroy SST App for Preview app environment
This step destroy the SST App in Preview app environment once it is merge to __prod__ and __stage__ environment.






