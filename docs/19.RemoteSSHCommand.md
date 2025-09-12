## Running the bash commands on ec2 instance using private ssh key

#### [running bash command with ssh workflow](https://github.com/clouddrove/github-shared-workflows/blob/feat/docker-scanner/.github/workflows/RemoteSSHCommand.yml)

- This workflow is used to run the bash commands on Ec2 instance using the private ssh key and Send the Notification to the particular slack channel after the completion of github-action using the Slack Webhook url.

#### Usage

- This workflow is designed to run all the bash commands on Ec2 instance using the private ssh key and also send the Notification to Slack channel after the completion of GitHub-action whether its Pass, fail or cancelled.

#### Example for running the bash commands on ec2 instance using private ssh key and send notification to Slack channel.

````yaml
name: Bash-commands with ssh Workflow
permissions:
  contents: read
  packages: write
  pull-requests: write

on:
  workflow_dispatch:

jobs:
  ssh-commands:
    uses: clouddrove/github-shared-workflows/.github/workflows/RemoteSSHCommand.yml@master
    with:
      port: # your_ssh_port
      timeout: # your_timeout_in_seconds
      command_timeout: # your_command_timeout_in_seconds
      slack_message: # your_slack_notification_message
      slack_icon: # your_slack_icon_url
      slack_username: # your_slack_username 
      slack_footer: # your_slack_footer
      slack_color: # your_slack_color
      slack-notification: # Enable or disable Slack notifications (example 'true' or 'false')
      script: |-
       # Add your bash commands here
    
    secrets:
      HOST: # Hostname or IP address of the EC2 instance
      PRIVATE_SSH_KEY: # Private SSH key for authenticating with the EC2 instance
      USERNAME: # SSH username for connecting to the EC2 instance
      SLACK_WEBHOOK_URL: # Slack Webhook URL for sending notifications
      
````  