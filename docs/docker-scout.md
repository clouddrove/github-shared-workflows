## Docker-Scout Workflow
#### [Docker scout workflow reference](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/docker-scout.yml)

This workflow involves locally scanning a Docker image and then comparing the latest Docker image with a specified image within the same repository. Workflows have been added in `.github/workflows/docker-compose.yml`.

#### Usage

This workflow is designed to locally build and scan a Docker image, offering vulnerability information, recommended fixes for the latest images, and the ability to compare the latest image with a specified image within the same repository.
#### Example for scan and push docker image on Dockerhub

```yaml
name: Docker-scout Workflow
# This permission are helpful for pushing vulnerability in security tab
permissions:
  contents: read
  packages: write
  pull-requests: write

on:
  workflow_dispatch:

jobs:
  docker-scout:
    uses: clouddrove/github-shared-workflows/.github/workflows/docker-scout.yml@master
    with:
      IMAGES:             # Specify the dockerhub repository name
      IMAGE_TAG:          # Give the tag to the latest image you want to build
      COMPARE_TAG:        # Specify the tag of the image you want to compare with within the same repository.
    secrets:
      DOCKERHUB_USERNAME: # Dockerhub username
      DOCKERHUB_PASSWORD: # Dockerhub password
      TOKEN:              # GitHub token
```
