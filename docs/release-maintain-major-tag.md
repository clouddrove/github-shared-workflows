# Release - Maintain Major Tag

Automatically maintains a **major version tag (`vX`)** when a new semantic version release (`X.Y.Z`) is published.

This workflow ensures that the major version tag always points to the **latest release of that major version**, making it easier for consumers to reference stable major versions.

---

## Overview

When a new release is published:

1. The workflow validates the release tag format.
2. Only **semantic version tags (`X.Y.Z`)** are processed.
3. The workflow extracts the **major version (`X`)**.
4. It updates or creates the corresponding **major tag (`vX`)**.
5. The major tag is force-pushed to point to the latest release.

Example:

| Release Tag | Updated Major Tag |
|-------------|------------------|
| `1.0.0` | `v1` → `1.0.0` |
| `1.2.3` | `v1` → `1.2.3` |
| `2.0.0` | `v2` → `2.0.0` |

---

## Workflow Trigger

The workflow runs when a **GitHub Release is published**.

```yaml
on:
  release:
    types: [published]