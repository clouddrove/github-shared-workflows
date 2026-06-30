## [Terraform Registry Webhook Sync](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/registry-webhook-sync.yml)

Keeps the **public Terraform Registry** in sync with new module tags automatically — no more manual *Resync Module* clicks.

### The problem

When the registry publishes a module it installs a GitHub webhook on the repo. By default that hook fires on the **`push`** event only. Registry tag ingestion keys off the **`create`** event, so new tags are never reported and the version only appears after a manual *Resync Module* in the UI.

This workflow audits the registry webhook on every matching repo across one or more orgs and ensures it carries the `push,create,delete` events. New repos self-heal on the next scheduled run.

### Inputs

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `orgs` | yes | – | Comma-separated GitHub orgs to audit, e.g. `clouddrove,org2`. |
| `repo_filter` | no | `^terraform-` | Only repos whose name matches this regex are touched. |
| `required_events` | no | `push,create,delete` | Events the registry hook must contain. |
| `dry_run` | no | `false` | Report drift only; make no changes. |

### Secrets

| Name | Required | Description |
|------|----------|-------------|
| `GH_ADMIN_TOKEN` | yes | PAT with `admin:repo_hook` + `repo` (read) scope across the orgs. Fine-grained: Webhooks read/write + Metadata read. |

### Example — scheduled self-healing caller

Drop this in an ops/infra repo (a reusable workflow cannot own the `schedule` trigger itself):

```yaml
name: Registry webhook sync
on:
  schedule:
    - cron: '0 6 * * 1'   # every Monday 06:00 UTC
  workflow_dispatch:
    inputs:
      dry_run:
        type: boolean
        default: false
jobs:
  sync:
    uses: clouddrove/github-shared-workflows/.github/workflows/registry-webhook-sync.yml@v2
    with:
      orgs: 'clouddrove,org2,org3,org4,org5'
      dry_run: ${{ inputs.dry_run || false }}
    secrets:
      GH_ADMIN_TOKEN: ${{ secrets.REGISTRY_HOOK_PAT }}
```

### Notes

- Repos with **no** registry webhook are reported (`⚠️`) but not modified — publish the module on the registry first, then this workflow maintains the hook.
- Run with `dry_run: true` (via `workflow_dispatch`) first to preview drift; the job summary lists every repo and the events it would set.
- This is the supported fix. The registry has **no** public API to force a resync, so fixing the webhook is the only durable, automatable path.
