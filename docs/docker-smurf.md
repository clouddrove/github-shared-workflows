## [Smurf-Docker-Helm Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/docker-smurf.yml)

This workflow is used to work with Docker and Helm using Smurf. It utilizes the workflows defined in `.github/workflows/docker-smurf.yml`

#### Usage
The following workflow can work with Docker Using Smurf tool. It can Build Images, Scan and Push.

It handles:
- 🐳 Build Docker image
- 💾 Save image as artifact
- 🛡️ Scan image for vulnerabilities
- 🏷️ Tag image for registry
- 🚀 Push image to registry (AWS / GCP / others)

#### Example for Smurf-Docker-Helm

```yaml
name: Smurf-Docker
on:
  push:

jobs:
  dev:
    uses: clouddrove/github-shared-workflows/.github/workflows/docker-smurf.yml@v2
    with:
      docker_image_name: # Image Name
      docker_image_tag: # Image Tag
      dockerfile_path: # Dockerfile path
      docker_registry_url: # Registry URL
      docker_registry: # Registry
    secrets:
      set-parameters:
        --set image.tag=${{ github.run_id }}
        --set password=${{ secrets.PASSWORD }}
```