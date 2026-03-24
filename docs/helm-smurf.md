## [Smurf-Docker-Helm Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/helm-smurf.yml)

This workflow is used to work with Helm using Smurf. It utilizes the workflows defined in `.github/workflows/helm-smurf.yml`

#### Usage
The following workflow can work with Helm Using Smurf tool. Talking about the Helm part it can Lint, Template, Deploy and also provides Rollback feature.

It automates Helm operations for Kubernetes:
- ✅ Helm lint (validate chart)
- ✅ Helm template (render manifests)
- ✅ Helm deploy (install/upgrade release)
- ✅ Helm rollback (revert to previous version)

#### Example for Smurf-Docker-Helm

```yaml
name: Smurf-Helm
on:
  push:

jobs:
  dev:
    uses: clouddrove/github-shared-workflows/.github/workflows/helm-smurf.yml@v2
    with:
      helm_release_name: # Release name
      helm_chart_directory: # Helm Chart Directory
      helm_enable: # Set to True for Helm Work
      helm_values_file_path: # Helm Chart Values Path
      helm_namespace: # Namespace
      timeout: # Timeout
    secrets:
      set-parameters:
        --set password=${{ secrets.PASSWORD }}
```