# Release - Maintain Major Tag

Automatically maintains a **major version tag (`vX`)** when a new semantic version release (`vX.Y.Z`) is published.

This workflow ensures that the major version tag always points to the **latest release of that major version**, making it easier for consumers to reference stable major versions.

---

## Overview

When a new release is published:

1. The workflow extracts the **major version (`vX`)**.
2. It updates or creates the corresponding **major tag (`vX`)**.
3. The major tag is force-pushed to point to the latest release.

Example:

| Release Tag | Updated Major Tag |
|-------------|------------------|
| `v1.0.0` | `v1` → `v1.0.0` |
| `v1.2.3` | `v1` → `v1.2.3` |
| `v2.0.0` | `v2` → `v2.0.0` |

---

## Workflow Trigger

The workflow runs when a **GitHub Release is published**.

```yaml
release-major-tag:
  needs: changelog
  if: always()
  uses: clouddrove/github-shared-workflows/.github/workflows/release-maintain-major-tag.yml
  with:
    tag_name: ${{ github.ref_name }}
  secrets:
    GITHUB: ${{ secrets.GITHUB }}