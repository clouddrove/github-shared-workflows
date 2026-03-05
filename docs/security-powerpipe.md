## [Powerpipe Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/powerpipe.yml)
Powerpipe is useful to scan cloud infrastructuer and plan cost optimization or find cloud infrastructure vulnerabilities using high level benchmarks as per industry trends.
It utilizes the workflows defined in `.github/workflows/powerpipe.yml`

#### Usage
- It will put the comment in Github Pull request if it's the pull request for terraform vulnerabilities, cost optimisation report, cloud benchmark testing report or any other. You just have to pass the workflow inputs accordingly.
- Visualize cloud configurations. Assess security posture against a massive library of benchmarks. Build custom dashboards with code.
- The only dashboarding tool designed from the ground up to visualize DevOps data. Explore your cloud, understand relationships and drill down to the details.

#### Get started
- First you need pass that which cloud provider you want to use. Use `cloud_provider` argument in the workflow.
- Choose which mod you want to use. There are multiple mods according to the requirement choose wisely. Here is the list of mod you can use: https://hub.powerpipe.io/
- Use mentioned plugins according to the examples shown below.
- For custom benchmarks and controls, use the `benchmarks` and `controls` argument.
- To authenticate with the AWS account or GCP, pass the shown keys and their values like below:
    - AWS:
        - `ASSUME_ROLE`
    - GCP:
        - 


**Powerpipe Reference Link:** https://powerpipe.io/

### Examples

#### PowerPipe with Terraform
```yaml
name: "PowerPipe for Terraform"
permissions:
  id-token: write
  issues: write
  pull-requests: write

on:
  pull_request:

jobs:
  powerpipe:
    uses: clouddrove/github-shared-workflows/.github/workflows/security-powerpipe.yml@2.0.0
    with:
      cloud_provider: 'AWS'
      mod_url: "https://github.com/turbot/steampipe-mod-terraform-aws-compliance"
      plugin_connection: |
        connection "aws_tf" {
          plugin = "terraform"
          configuration_file_paths = [
            "terraform/aws/**/*.tf"
          ]
        }
        connection "aws" {
          plugin = "aws"
        }
      benchmarks: |
        ec2
    secrets: 
      TOKEN: ${{ secrets.GITHUB_TOKEN }}           ## Change the workflow permissions to change this Token's permissions
      aws_assume_role: ${{ secrets.assume_role }}  ## Assume IAM Role to assume AWS account
```

#### PowerPipe for Cost Optimization Report - AWS
```yaml
name: "PowerPipe for Cost Optimization Report"
permissions:
  id-token: write
  issues: write
  pull-requests: write
on:
  pull_request:
  push:
    branches:
      - 'master'
      - 'main'

jobs:
  powerpipe:
    uses: clouddrove/github-shared-workflows/.github/workflows/security-powerpipe.yml@master
    with:
      cloud_provider: 'AWS'
      mod_url: "https://github.com/turbot/steampipe-mod-aws-thrifty"
      plugin_connection: |
        connection "aws" {
          plugin = "aws"
        }
      benchmarks: |
        ec2
    secrets: 
      TOKEN: ${{ secrets.GITHUB_TOKEN }}           ## Change the workflow permissions to change this Token's permissions
      aws_assume_role: ${{ secrets.assume_role }}  ## Assume IAM Role to assume AWS account
```

#### PowerPipe for Cost Optimization Report - Azure
```yaml
name: "PowerPipe for Cost Optimization Report"
permissions:
  id-token: write
  issues: write
  pull-requests: write
on:
  pull_request:
  push:
    branches:
      - 'master'
      - 'main'

jobs:
  powerpipe:
    uses: clouddrove/github-shared-workflows/.github/workflows/security-powerpipe.yml@master
    with:
      cloud_provider: 'AZURE'
      mod_url: "https://github.com/turbot/steampipe-mod-azure-thrifty"
      plugin_connection: |
        connection "azure" {
          plugin = "azure"
        }
      benchmarks: |
        compute        # Check benchmark lists here: https://hub.powerpipe.io/mods/turbot/azure_thrifty/controls#benchmarks
    secrets: 
      TOKEN: ${{ secrets.GITHUB_TOKEN }}           ## Change the workflow permissions to change this Token's permissions
      AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
      AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
      SUBSCRIPTION_ID: ${{ secrets.SUBSCRIPTION_ID }}
```


#### PowerPipe for Cloud compliances
```yaml
name: "PowerPipe on Compliances"
permissions:
  id-token: write
  issues: write
  pull-requests: write
on:
  pull_request:
  push:
    branches:
      - 'master'
      - 'main'

jobs:
  powerpipe:
    uses: clouddrove/github-shared-workflows/.github/workflows/security-powerpipe.yml@master
    with:
      cloud_provider: 'AWS'
    secrets: 
      TOKEN: ${{ secrets.GITHUB_TOKEN }}           ## Change the workflow permissions to change this Token's permissions
      aws_assume_role: ${{ secrets.assume_role }}  ## Assume IAM Role to assume AWS account
```

<br><br><br>
Show below picture for more understanding

![image1](https://github.com/clouddrove/github-shared-workflows/blob/master/images/powerpipe-readme-1.png)

![image2](https://github.com/clouddrove/github-shared-workflows/blob/master/images/powerpipe-readme-2.png)

![image3](https://github.com/clouddrove/github-shared-workflows/blob/master/images/powerpipe-readme-3.png)