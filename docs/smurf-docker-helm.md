## [Smurf-Docker-Helm Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/smurf_docker_helm.yml)

This workflow is used to work with Docker and Helm using Smurf. It utilizes the workflows defined in `.github/workflows/smurf_docker_helm.yml`

#### Usage
The following workflow can work with Docker and Helm Using Smurf tool. It can Build Images, Scan and Push. Talking about the Helm part it can Lint, Template, Deploy and also provides Rollback feature.
#### Example for Smurf-Docker-Helm

```yaml
name: Smurf-Docker-Helm
on:
  push:

jobs:
  dev:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf_docker_helm.yml@master
    with:
      docker_image_name: # Image Name
      docker_image_tag: # Image Tag
      dockerfile_path: # Dockerfile path
      docker_registry_url: # Registry URL
      docker_registry: # Registry
      helm_release_name: # Release name
      helm_chart_directory: # Helm Chart Directory
      helm_enable: # Set to True for Helm Work
      helm_values_file_path: # Helm Chart Values Path
      helm_namespace: # Namespace
      timeout: # Timeout
    secrets:
      set-parameters:
        --set image.tag=${{ github.run_id }}
        --set password=${{ secrets.PASSWORD }}
```