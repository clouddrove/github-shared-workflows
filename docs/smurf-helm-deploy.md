## [Smurf Helm Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/smurf-helm-deploy.yml)

Reusable workflow for Helm chart lint, template, deploy, and rollback using [Smurf SELM](https://github.com/clouddrove/smurf) (`smurf selm`).

**Shared workflow:** `.github/workflows/smurf-helm-deploy.yml`  
**Caller workflow:** lives in your application repo and calls the shared workflow via `workflow_call`.

### Architecture

```
Your repo (caller)                    github-shared-workflows (shared)
─────────────────                   ─────────────────────────────────
.github/workflows/
  helm-caller.yml    ──uses──►  .github/workflows/smurf-helm-deploy.yml
                                      │
                                      ├── job: helm-lint      (helm_enable)
                                      ├── job: helm-deploy    (helm_enable, needs lint)
                                      └── job: helm-rollback  (helm_rollback_enable)
```

**Rule:** One caller **job** = one shared workflow invocation. Use separate caller jobs (or separate workflow files) for deploy vs rollback if you want independent triggers.

### What it does

- **Lint** — `smurf selm lint` on chart + values
- **Template** — `smurf selm template` to render manifests
- **Deploy** — `smurf selm upgrade --install` against EKS, GKE, or AKS
- **Rollback** — `smurf selm rollback` to a specific revision

Cloud authentication and kubeconfig setup run inside the deploy/rollback jobs based on `provider`.

### Required repository setup

1. Helm chart directory committed to the repo (e.g. `./charts/my-app/`).
2. Values file path relative to repo root (e.g. `./charts/my-app/values.yaml`).
3. Cluster access via OIDC/keys (AWS), service account (GCP), or service principal (Azure).
4. Optional: GitHub **Environment** for approval gates — set `target_environment`.

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `provider` | string | `aws` | `aws`, `gcp`, or `azure` |
| `helm_enable` | boolean | `false` | Run lint + deploy jobs |
| `helm_rollback_enable` | boolean | `false` | Run rollback job |
| `helm_release_name` | string | — | Helm release name |
| `helm_chart_directory` | string | — | Path to chart directory |
| `helm_values_file_path` | string | — | Values file path (repo root relative) |
| `helm_namespace` | string | `default` | Kubernetes namespace |
| `helm_revision` | string | — | Revision for rollback |
| `helm_timeout` | string | `5m` | Install/upgrade timeout |
| `helm_flags` | string | `--atomic --wait --create-namespace` | Extra upgrade flags |
| `helm_plugin_install` | boolean | `false` | Install Helm plugins before deploy |
| `helm_plugins` | string | — | Args for `smurf selm plugin` |
| `helm_repo_add` | boolean | `false` | Add remote Helm repo before deploy |
| `helm_repository` | string | — | Repo name for `helm repo add` |
| `helm_repository_url` | string | — | Repo URL |
| `target_environment` | string | `""` | GitHub Environment name (empty = no gate) |
| `smurf_version` | string | `v1.1.5` | Smurf CLI version |
| `aws_region` | string | `us-east-1` | AWS region |
| `aws_eks_cluster_name` | string | — | EKS cluster name |
| `aws_assume_role` | boolean | `false` | Assume secondary IAM role |
| `aws_assume_role_arn` | string | — | Secondary role ARN |
| `gcp_project_id` | string | — | GCP project ID |
| `gcp_region` | string | `us-central1` | GCP region |
| `gcp_gke_cluster_name` | string | — | GKE cluster name |

### Secrets

| Secret | Required when | Description |
|--------|---------------|-------------|
| `BUILD_ROLE` | AWS OIDC | IAM role for EKS kubeconfig |
| `AWS_ACCESS_KEY_ID` | AWS keys | Static key auth (optional) |
| `AWS_SECRET_ACCESS_KEY` | AWS keys | Static key auth (optional) |
| `AWS_SESSION_TOKEN` | AWS keys | Optional session token |
| `GCP_CREDENTIALS` | GCP JSON | Service account JSON |
| `WORKLOAD_IDENTITY_PROVIDER` | GCP WIP | Workload Identity Provider |
| `SERVICE_ACCOUNT` | GCP WIP | GCP service account email |
| `AZURE_CREDENTIALS` | Azure | Service principal JSON |
| `helm_extra_args` | Optional | Extra CLI args (e.g. `--set image.tag=latest`) |

### Caller permissions

```yaml
permissions:
  id-token: write
  contents: read
```

---

### Example: AWS EKS deploy (push trigger)

```yaml
name: Smurf Helm — AWS EKS

on:
  push:
    branches: [main]
    paths:
      - 'charts/**'

permissions:
  id-token: write
  contents: read

jobs:
  helm-deploy:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-helm-deploy.yml@v2
    with:
      provider: aws
      helm_enable: true
      helm_release_name: temp-app
      helm_chart_directory: ./temp
      helm_values_file_path: ./temp/values.yaml
      helm_namespace: default
      aws_region: us-east-1
      aws_eks_cluster_name: my-eks-cluster
      helm_timeout: 5m
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
      helm_extra_args: --set image.tag=${{ github.sha }}
```

---

### Example: GCP GKE deploy

```yaml
name: Smurf Helm — GCP GKE

on:
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  helm-deploy:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-helm-deploy.yml@v2
    with:
      provider: gcp
      helm_enable: true
      helm_release_name: my-app
      helm_chart_directory: ./charts/my-app
      helm_values_file_path: ./charts/my-app/values-prod.yaml
      helm_namespace: production
      gcp_project_id: my-gcp-project
      gcp_region: us-central1
      gcp_gke_cluster_name: my-gke-cluster
    secrets:
      GCP_CREDENTIALS: ${{ secrets.GCP_CREDENTIALS }}
      helm_extra_args: --set image.tag=${{ github.sha }}
```

For Workload Identity, pass `WORKLOAD_IDENTITY_PROVIDER` and `SERVICE_ACCOUNT` instead of (or in addition to) `GCP_CREDENTIALS`.

---

### Example: Azure AKS deploy

```yaml
name: Smurf Helm — Azure AKS

on:
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  helm-deploy:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-helm-deploy.yml@v2
    with:
      provider: azure
      helm_enable: true
      helm_release_name: my-app
      helm_chart_directory: ./charts/my-app
      helm_values_file_path: ./charts/my-app/values.yaml
      helm_namespace: default
    secrets:
      AZURE_CREDENTIALS: ${{ secrets.AZURE_CREDENTIALS }}
```

Ensure the Azure service principal has `Azure Kubernetes Service Cluster User Role` on the target cluster.

---

### Example: Deploy + rollback (manual dispatch)

Use one caller workflow with two jobs — deploy and rollback are controlled by dispatch inputs:

```yaml
name: Smurf Helm — Deploy or Rollback

on:
  workflow_dispatch:
    inputs:
      action:
        description: Action to perform
        required: true
        type: choice
        options:
          - deploy
          - rollback
      revision:
        description: Rollback revision (required for rollback)
        required: false
        type: string

permissions:
  id-token: write
  contents: read

jobs:
  helm-deploy:
    if: ${{ github.event.inputs.action == 'deploy' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-helm-deploy.yml@v2
    with:
      provider: aws
      helm_enable: true
      helm_release_name: temp-app
      helm_chart_directory: ./temp
      helm_values_file_path: ./temp/values.yaml
      helm_namespace: default
      aws_region: us-east-1
      aws_eks_cluster_name: my-eks-cluster
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}

  helm-rollback:
    if: ${{ github.event.inputs.action == 'rollback' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-helm-deploy.yml@v2
    with:
      provider: aws
      helm_rollback_enable: true
      helm_release_name: temp-app
      helm_revision: ${{ github.event.inputs.revision }}
      helm_namespace: default
      aws_region: us-east-1
      aws_eks_cluster_name: my-eks-cluster
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
```

---

### Example: Remote chart repo + plugins

```yaml
jobs:
  helm-deploy:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-helm-deploy.yml@v2
    with:
      provider: aws
      helm_enable: true
      helm_repo_add: true
      helm_repository: bitnami
      helm_repository_url: https://charts.bitnami.com/bitnami
      helm_plugin_install: true
      helm_plugins: install diff
      helm_release_name: nginx
      helm_chart_directory: bitnami/nginx
      helm_values_file_path: ./values/nginx.yaml
      aws_eks_cluster_name: my-eks-cluster
      aws_region: us-east-1
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
```

---

### Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Lint passes, deploy fails on kubeconfig | Wrong cluster name or region | Verify `aws_eks_cluster_name` / `gcp_gke_cluster_name` and region inputs |
| Rollback job skipped | Flag not set | Set `helm_rollback_enable: true` and provide `helm_revision` |
| Deploy and rollback both run | Both flags true | Use separate caller jobs with `if` conditions |
| `helm_extra_args` ignored | Wrong secret name | Pass as `secrets.helm_extra_args`, not under `with` |
| Environment gate blocks deploy | `target_environment` set | Configure environment protection rules or leave empty |
