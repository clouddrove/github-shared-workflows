## [Smurf Docker Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/smurf-docker.yml)

Reusable workflow for building, scanning, and pushing Docker images with [Smurf SDKR](https://github.com/clouddrove/smurf) (`smurf sdkr`).

**Shared workflow:** `.github/workflows/smurf-docker.yml`  
**Caller workflow:** lives in your application repo under `.github/workflows/` and calls the shared workflow via `workflow_call`.

### Architecture

```
Your repo (caller)                    github-shared-workflows (shared)
─────────────────                   ─────────────────────────────────
.github/workflows/
  docker-caller.yml  ──uses──►  .github/workflows/smurf-docker.yml
                                      │
                                      ├── job: docker_build
                                      │     build → save tar → upload artifact
                                      │
                                      └── job: docker_scan_push (needs docker_build)
                                            download → load → scan → tag → push
```

**Rule:** One caller **job** invokes one shared workflow. The shared workflow runs `docker_build` and `docker_scan_push` internally when enabled.

### What it does

- Build a Docker image with `smurf sdkr build`
- Save the image as a tar artifact (`docker-image`) for the scan/push job
- Scan with Trivy via `smurf sdkr scan`
- Tag and push to AWS ECR, Azure ACR, GCP GCR/Artifact Registry, or Docker Hub

### Required repository setup

1. Commit a `Dockerfile` at the path you pass as `dockerfile_path` (default: `Dockerfile` at repo root).
2. The `-f` flag path is **relative to the build context** (repo root by default).
3. Grant the caller repo permission to use shared workflows from `clouddrove/github-shared-workflows` (org settings → Actions → access).

### Image naming

The full pushed image is assembled in the shared workflow:

```
{docker_registry_url}/{docker_image_name}:{docker_image_tag}
```

| Input | Example | Notes |
|-------|---------|-------|
| `docker_registry_url` | `924144197303.dkr.ecr.us-east-1.amazonaws.com` | Registry host only — no image name or tag |
| `docker_image_name` | `smurf/smurt-test` | Repository path inside the registry |
| `docker_image_tag` | `${{ github.sha }}` | Tag applied at build and push |

**Example full image:**  
`924144197303.dkr.ecr.us-east-1.amazonaws.com/smurf/smurt-test:abc1234`

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `docker_enable` | string | — | Set to `'true'` to run build (and scan/push when push enabled) |
| `docker_push` | string | — | Set to `'true'` to scan, tag, and push after build |
| `provider` | string | `aws` | Cloud provider for auth (`aws`, `azure`, `gcp`, `digitalocean`) |
| `docker_image_name` | string | — | Local and registry image name (without registry host) |
| `docker_image_tag` | string | `latest` | Image tag |
| `docker_image_tar` | string | `image` | Filename for saved tar artifact |
| `docker_registry` | string | `aws` | Push target: `aws`, `az`, `gcp`, or `hub` |
| `docker_registry_url` | string | — | Registry URL (required for push) |
| `dockerfile_path` | string | `Dockerfile` | Dockerfile path relative to repo root |
| `docker_build_args` | string | `key1=val1` | Single `--build-arg` value |
| `docker_build_platform` | string | `linux/amd64` | Target platform |
| `docker_buildkit_enable` | string | `false` | Set to `'true'` to pass `--buildkit` |
| `aws_region` | string | `us-east-1` | AWS region for ECR auth |
| `aws_assume_role` | string | `false` | Set to `'true'` to assume `aws_assume_role_arn` |
| `aws_assume_role_arn` | string | — | Secondary IAM role ARN |
| `gcp_auth_method` | string | — | `wip` or `json` for GCP auth |
| `gcp_project_id` | string | — | GCP project ID |
| `gcp_docker_push` | string | `false` | Set to `'true'` to push with `--project-id` (GCP) |

> **Note:** `docker_enable`, `docker_push`, and other toggles use the string `'true'` / `'false'`, not YAML booleans.

### Secrets

| Secret | Required when | Description |
|--------|---------------|-------------|
| `BUILD_ROLE` | AWS OIDC | IAM role ARN for `configure-aws-credentials` |
| `AWS_ACCESS_KEY_ID` | AWS keys | Optional static key auth |
| `AWS_SECRET_ACCESS_KEY` | AWS keys | Optional static key auth |
| `AWS_SESSION_TOKEN` | AWS keys | Optional session token |
| `GCP_WIP` | GCP WIP | Workload Identity Provider |
| `GCP_SERVICE_ACCOUNT` | GCP WIP | Service account email |
| `GOOGLE_CREDENTIALS` | GCP JSON | Service account JSON key |
| `DOCKER_USERNAME` | Docker Hub | Hub username |
| `DOCKER_PASSWORD` | Docker Hub | Hub access token or password |

### Caller permissions

Add to the caller workflow when using OIDC (AWS/GCP):

```yaml
permissions:
  id-token: write
  contents: read
```

---

### Example: AWS ECR (push on branch)

```yaml
name: Smurf Docker — AWS ECR

on:
  push:
    branches: [main]

permissions:
  id-token: write
  contents: read

jobs:
  docker-ecr:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-docker.yml@v2
    with:
      docker_enable: 'true'
      docker_push: 'true'
      provider: aws
      docker_registry: aws
      docker_image_name: smurf/smurt-test
      docker_image_tag: ${{ github.sha }}
      docker_registry_url: 924144197303.dkr.ecr.us-east-1.amazonaws.com
      dockerfile_path: Dockerfile
      aws_region: us-east-1
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
```

**Repository secrets:** `BUILD_ROLE` (OIDC role with ECR push permissions).

---

### Example: Docker Hub (manual dispatch)

```yaml
name: Smurf Docker — Docker Hub

on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  docker-hub:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-docker.yml@v2
    with:
      docker_enable: 'true'
      docker_push: 'true'
      docker_registry: hub
      docker_image_name: anketclouddrove/smurf-workflows
      docker_image_tag: ${{ github.sha }}
      docker_registry_url: docker.io
      dockerfile_path: Dockerfile
    secrets:
      DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
      DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
```

---

### Example: GCP Artifact Registry

```yaml
name: Smurf Docker — GCP

on:
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  docker-gcp:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-docker.yml@v2
    with:
      docker_enable: 'true'
      docker_push: 'true'
      provider: gcp
      docker_registry: gcp
      gcp_auth_method: json
      gcp_project_id: my-gcp-project
      gcp_docker_push: 'true'
      docker_image_name: my-app
      docker_image_tag: ${{ github.sha }}
      docker_registry_url: us-central1-docker.pkg.dev/my-gcp-project/my-repo
      dockerfile_path: Dockerfile
    secrets:
      GOOGLE_CREDENTIALS: ${{ secrets.GCP_CREDENTIALS }}
```

For Workload Identity, set `gcp_auth_method: wip` and pass `GCP_WIP` + `GCP_SERVICE_ACCOUNT` secrets instead.

---

### Example: Azure ACR

```yaml
name: Smurf Docker — Azure ACR

on:
  workflow_dispatch:

permissions:
  id-token: write
  contents: read

jobs:
  docker-azure:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-docker.yml@v2
    with:
      docker_enable: 'true'
      docker_push: 'true'
      provider: azure
      docker_registry: az
      docker_image_name: my-app
      docker_image_tag: ${{ github.sha }}
      docker_registry_url: myregistry.azurecr.io
      dockerfile_path: Dockerfile
    secrets:
      BUILD_ROLE: ${{ secrets.BUILD_ROLE }}
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

> Configure Azure ACR credentials per your org’s Smurf/Azure setup. The shared workflow uses AWS credential action for `provider: aws`; for Azure registry push, align secrets with your ACR authentication method.

---

### Build only (no push)

```yaml
jobs:
  docker-build:
    uses: clouddrove/github-shared-workflows/.github/workflows/smurf-docker.yml@v2
    with:
      docker_enable: 'true'
      docker_push: 'false'
      docker_image_name: my-app
      docker_image_tag: ${{ github.sha }}
      dockerfile_path: Dockerfile
```

---

### Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| `failed to read dockerfile` | Dockerfile not in git or wrong path | Commit `Dockerfile`; use path relative to repo root (e.g. `Dockerfile`, not `./Dockerfile` if Smurf joins paths) |
| Artifact upload fails | `/` in artifact name | Shared workflow uses fixed name `docker-image` — do not put `/` in `docker_image_name` for artifact naming |
| ECR login / push fails | Missing OIDC or wrong registry URL | Set `BUILD_ROLE`; hardcode full ECR host in `docker_registry_url` |
| Hub push fails | Missing env vars | Set `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets; use `docker_registry: hub` |
| Scan step fails | Trivy not installed | Handled by shared workflow — ensure `docker_push: 'true'` so scan job runs after successful build |
| Job skipped | Wrong toggle type | Use string `'true'`, not boolean `true`, for `docker_enable` and `docker_push` |
