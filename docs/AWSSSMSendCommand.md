## Running the bash commands on ec2 instance without SSH

## Requirements

- To utilize this action, you must configure your IAM user with the AWS IAM Role "AmazonSSMFullAccess".
- EC2 instance needs to be associated with an IAM Role that includes the "AmazonSSMFullAccess" policy.


#### [running bash command without ssh workflow](https://github.com/clouddrove/github-shared-workflows/blob/feat/docker-scanner/.github/workflows/AWSSSMsendCommand.yml)

- This workflow is used to run the bash commands on Ec2 instance without ssh and Send the Notification to the particular slack channel after the completion of github-action using the Slack Webhook url.

#### Usage

- This action helps you to execute remote bash command for AWS EC2 instance without SSH or other accessing. Also send the Notification to Slack channel after the completion of GitHub-action whether its (Pass, fail or cancelled.)

#### Example for running the bash commands on ec2 instance without SSH and send notification to Slack channel.

````yaml
name: Bash commands without ssh
permissions:
  contents: read
  packages: write
  pull-requests: write

on:
  workflow_dispatch:

jobs:
  bash-commands-without-ssh:
    uses: clouddrove/github-shared-workflows/.github/workflows/AWSSSMSendCommand.yml@master
    with:
      working-directory: # Specify the working directory for the job
      slack_message: # Message to be sent to Slack
      slack_icon: # Icon for Slack message
      slack_username: # Username for Slack message
      slack_footer: # Footer for Slack message
      slack_color: # Color for Slack message
      slack-notification: # Enable or disable Slack notifications (example 'true' or 'false')
      command: |- 
      # Add your bash commands here
     
    secrets:
      AWS_REGION:  # AWS region for authentication
      AWS_ACCESS_KEY_ID: # AWS access key ID for authentication
      AWS_SECRET_ACCESS_KEY: # AWS secret access key for authentication
      INSTANCE_ID: # ID of the instance for the bash commands
      SLACK_WEBHOOK_URL: # Webhook URL for sending messages to Slack          
````      