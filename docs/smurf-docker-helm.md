## [Smurf-Docker-Helm Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/smurf.yml)

This workflow is used to work with Docker and Helm using Smurf. It utilizes the workflows defined in `.github/workflows/smurf.yml`

#### Usage
The following workflow can work with Docker and Helm Using Smurf tool. It can Build Images, Scan and Push. Talking about the Helm part it can Lint, Template, Deploy and also provides Rollback feature.
#### Example for  Smurf-Docker-Helm

```yaml
name: Smurf-Docker-Helm
on:
  push:

jobs:
  dev:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf.yml@master
    with:
      image_name: # Image Name
      image_tag: # Image Tag
      dockerfile_path: # Dockerfile path
      registry-url: # Registry URL
      registry: # Registry
      release-name: # Release name
      helm-chart-directory: # Helm Chart Directory
      helm_enable: # Set to True for Helm Work
      values_file_path: # Helm Chart Values Path
      namespace: # Namespace
      timeout: # Timeout
    secrets:
      set-parameters:
        --set image.tag=${{ github.run_id }}
        --set password=${{ secrets.PASSWORD }}
```