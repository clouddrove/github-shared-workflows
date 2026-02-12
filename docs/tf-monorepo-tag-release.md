# �� Terraform Module Auto Tag Release Guide

This guide explains how to automatically **create** **versions**, **tags**, and **releases** for Terraform modules inside a **single GitHub repository**. The workflow works with multiple modules (e.g., `terraform-aws-s3`, `terraform-aws-iam-role`) and uses semantic versioning based on commit messages.

Sample GitHub Repository Structure containing multiple terraform module with prefix `terraform-aws-`
```bash
├── README.md
├── .git
├── .github
├── terraform-aws-ec2
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables.tf
│   └── versions.tf
├── terraform-aws-iam-role
│   ├── main.tf
│   ├── outputs.tf
│   ├── variables.tf
│   └── versions.tf
└── terraform-aws-vpc
    ├── main.tf
    ├── outputs.tf
    ├── variables.tf
    └── versions.tf
```

Sample CHANGELOG.md
```bash
Terraform Module Released Tags

terraform-aws-ec2
 • 5.1.0 (latest)
 • 5.0.0
 • 4.2.0

terraform-aws-iam-role
 • 1.1.0 (latest)
 • 1.0.0

terraform-aws-vpc
 • 5.0.0 (latest)
 • 4.0.4
 • 4.0.3
```

---

## �� How it Works

- Detects which Terraform modules changed.
- Reads commit messages to determine version bump (**major, minor, patch, no-release**).
- Creates Git tags like:
  ```
  terraform-aws-vpc/1.2.3
  ```
- Pushes new tags to the repository.

---

## ��️ Setup Instructions

### 1. Add Shared Workflow to Your Repo

In your repo (`.github/workflows/tf-monorepo-tag-release.yml`):

```yaml
name: 🚀 (Monorepo) Terraform Module Auto Tag Release

on:
  push:
    branches:
      - master

permissions:
  contents: write

jobs:
  module-release:
    uses: clouddrove/github-shared-workflows/.github/workflows/tf-monorepo-tag-release.yml@master
    with:
         module_prefix: ""       # Replace with your Module Prefix by deafult "terraform-aws-"
```

---

### �� Initial Tagging (First Release)

Before using the workflow, you must tag each module with a base version (`1.0.0`).

Run this script locally:

```bash
#!/usr/bin/env bash
set -euo pipefail

# --- Config ---
REPO_URL="git@github.com:clouddrove/terraform-modules.git"    #Replace with your terraform module Repo 
WEB_URL="https://github.com/clouddrove/terraform-modules"     #Replace with your terraform module Repo
CHANGELOG="CHANGELOG.md"
MODULE_PREFIX="terraform-"   # must match with module's directory name

# Modules list (initial tag )
modules=("terraform-aws-new-module-1" "terraform-aws-new-module-2")  # Replace with your modules

# --- Version to tag ---
version="1.0.0"

# --- Tag modules ---
for module in "${modules[@]}"; do
  tag="${module}/${version}"
  git tag "$tag"
  echo "✅ Tagged $tag"
done

git push --tags

# Always fetch all tags from remote
git fetch --tags --force

# --- Regenerate CHANGELOG in alphabetical order ---
echo "📝 Regenerating $CHANGELOG ..."
echo "# Terraform Module Released Tags" > "$CHANGELOG"
echo "" >> "$CHANGELOG"

# Find all modules in repo (with prefix) and sort alphabetically
MODULES=$(find . -maxdepth 1 -type d -name "${MODULE_PREFIX}*" -printf "%f\n" | sort)

for module in $MODULES; do
  echo "📝 Updating CHANGELOG.md for $module"

  # Get all tags for this module (from remote + local)
  TAGS=$(git tag --list | grep "^${module}/" | sed "s|^${module}/||" | sort -Vr)

  if [ -z "$TAGS" ]; then
    echo "⚠️ No tags found for $module"
    continue
  fi

  NEWEST=$(echo "$TAGS" | head -n1)

  {
    echo "## $module"
    for t in $TAGS; do
      tag_url="$WEB_URL/releases/tag/$module/$t"
      if [ "$t" = "$NEWEST" ]; then
        echo "- [$t (latest)]($tag_url)"
      else
        echo "- [$t]($tag_url)"
      fi
    done
    echo
  } >> "$CHANGELOG"
done
```

---

## �� Commit Message Guidelines

Version bump depends on commit message:

- **major** → Breaking changes (API change, incompatible updates, big refactor).
- **minor** → New features (backward-compatible, adds functionality).
- **patch** → Bug fixes / small changes (backward-compatible).
- **no-release** → Skip tagging (docs, comments, refactor only).

### Examples:

```bash
git commit -m "major: (terraform-aws-ec2) migrated from t2.micro to t3.micro instances (breaking change)"
git commit -m "minor: (terraform-aws-ec2) added support for multiple security groups"
git commit -m "patch: (terraform-aws-ec2) fixed incorrect AMI ID in default configuration"
git commit -m "no-release: (terraform-aws-ec2) updated documentation for module usage"
```

---

## �� Changelog

All released module versions are documented in the **CHANGELOG.md** file.  
It is automatically generated from Git tags and always kept up to date.  
You can use it to quickly check the **latest release**, or browse the **full release history** of every module in this repository.

---

## �� Workflow Usage Rules

- You can change a single module → commit message must contain bump label.  
- You can change multiple modules → commit changes separately, then squash & merge PR.  
- Before merging PR → ensure only latest **2–3 relevant commits** exist (remove junk commits).  
- After initial tags, you can continue normal development and bump versions with commit messages.  

⚠️ Always:
- Add your module to **master branch**.  
- Run initial tagging script once.  
- Then use workflow for bumps and releases.  

---
