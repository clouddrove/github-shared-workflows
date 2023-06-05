## [Terraform Checks Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/terraform.yml)

This workflow is used to terraform checks. Workflows have been added in `.github/workflows/terraform.yml`

#### Usage
This workflow is used to terraform checks. Workflows have been added in `.github/workflows/terraform.yml`

#### Example with azure cloud
```yaml
name: Terraform Checks

on:
  pull_request:

jobs:
  terraform:
    uses: clouddrove/github-shared-workflows/.github/workflows/terraform.yml@master
    secrets:
      GITHUB: ${{ secrets.GITHUB }}
      DIGITALOCEAN_ACCESS_TOKEN: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
    with:
      provider: 'azurerm'
      working_directory: './_example/'
```
#### Example with aws cloud
```yaml
name: Terraform Checks

on:
  pull_request:

jobs:
  terraform:
    uses: clouddrove/github-shared-workflows/.github/workflows/terraform.yml@master
    secrets:
      GITHUB: ${{ secrets.GITHUB }}
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_SESSION_TOKEN: ${{ secrets.AWS_SESSION_TOKEN }}
    with:
      provider: 'aws'
      working_directory: './_example/'
```
#### Example with digitalocean cloud
```yaml
name: Terraform Checks

on:
  pull_request:

jobs:
  terraform:
    uses: clouddrove/github-shared-workflows/.github/workflows/terraform.yml@master
    secrets:
      GITHUB: ${{ secrets.GITHUB }}
      DIGITALOCEAN_ACCESS_TOKEN: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
    with:
      provider: 'digitalocean'
      working_directory: './_example/'
```