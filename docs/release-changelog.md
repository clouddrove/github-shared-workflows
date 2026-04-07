# 📄 CHANGELOG Workflow

This reusable GitHub Actions workflow automates:

- ✅ Release tag validation based on repository format  
- 📝 CHANGELOG.md generation  
- 🚀 GitHub Release creation  
- 🔄 Automatic commit of updated CHANGELOG  

---

## 📦 Workflow Location

```
clouddrove/github-shared-workflows/.github/workflows/release-changelog.yml@v2
```

---

## ⚙️ Inputs

| Name         | Required | Type   | Description |
|--------------|----------|--------|-------------|
| `branch`     | ✅ Yes   | string | Target branch where CHANGELOG.md will be committed |
| `tag_format` | ❌ No    | string | Repository tag format (`vX.Y.Z` or `X.Y.Z`)  default : vX.Y.Z |
| `release_tag`| ✅ Yes   | string | Actual release tag to validate |

---

## 🔐 Secrets

| Name     | Required | Description |
|----------|----------|-------------|
| `GITHUB` | ✅ Yes   | Personal Access Token (PAT) with repo permissions |

---

## 📤 Outputs

| Name   | Description |
|--------|-------------|
| `valid` | Indicates whether the release tag matches the repository format |

---

## 🧠 How It Works

### 1. Tag Validation

The workflow checks if the provided `release_tag` matches the repository's `tag_format`.

#### Supported Formats:

- `v1.2.3` → Version with `v` prefix  
- `1.2.3` → Plain version  

If the tag format does not match:
- ❌ Workflow skips changelog generation  
- ❌ No release is created  

---

### 2. Changelog Generation

If validation passes:

- Generates changelog using commit history  
- Updates `CHANGELOG.md`  

---

### 3. Release Creation

- Creates or updates GitHub Release  
- Uses generated changelog as release notes  
- Marks release as **latest**  

---

### 4. Commit Changes

- Commits updated `CHANGELOG.md` to the specified branch  

---

## 🚀 Usage Example

```yaml
name: Release

on:
  release:
    types: [published]

jobs:
  changelog:
    uses: clouddrove/github-shared-workflows/.github/workflows/release-changelog.yml@v2
    with:
      branch: master
      tag_format: vX.Y.Z //Repository tag format (`vX.Y.Z` or `X.Y.Z`)  default : vX.Y.Z
      release_tag: ${{ github.ref_name }}
    secrets:
      GITHUB: ${{ secrets.GITHUB_TOKEN }}
```

---

## ❌ Invalid Tag Examples

| Format Expected | Invalid Tag |
|----------------|------------|
| `v1.2.3`       | `1.2.3` , `v1.2.3-beta`    |
| `1.2.3`        | `v1.2.3`, `1.2.3-beta`   |
| any            | `v1.2` / `1.2` / `latest` |

---

## 💡 Notes

- Ensure your repository follows a consistent tagging strategy  
- This workflow prevents accidental releases with incorrect tag formats  
- Supports both prefixed and non-prefixed semantic versioning  

---

## 🛠 Maintained By

CloudDrove CI Team