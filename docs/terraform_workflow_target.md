## [Terraform Targeted Workflow](https://github.com/clouddrove/github-shared-workflows/.github/workflows/terraform_workflow_target.yml)

This workflow is used to **apply or destroy specific Terraform resources** using GitHub Actions.  
It utilizes a reusable workflow defined in `.github/workflows/terraform_workflow_target.yml`.

---

### 🔧 Usage

This workflow is triggered on push to the `feat/terraform_workflow-target` branch. It reads a Terraform target module or resource from a file and performs a plan and apply (or destroy) based on **manual approval**.

📄 Target is specified in the file:  
`.github/workflows/terraform_target_module_details.txt`

---

### ✅ Features

- Targeted Terraform **apply/destroy** support
- Flexible input: **file-based** or **direct target**
- Works with **AWS, GCP, Azure, DigitalOcean**
- **Manual approval** enforcement for safety
- Supports **OIDC authentication** for AWS (secure and keyless)

---

### 🌐 Example Workflow for AWS

```yaml
name: Trigger Terraform From Branch Push

permissions:
  id-token: write   # For AWS OIDC access
  contents: read    # To fetch repo content

on:
  push:
    branches:
      - feat/terraform_workflow-target

jobs:
  targeted-deploy:
    uses: clouddrove/github-shared-workflows/.github/workflows/terraform_workflow_target.yml@feat/terraform_workflow-target
    with:
      provider: aws
      working_directory:                # Terraform module path
      aws_region:                       # AWS region
      terraform_version:                # Terraform version
      destroy:                          # true = terraform destroy
      approvers:                        # GitHub approver(s)
      target_environment:               # GitHub environment for approval
      target_file: 			# Path to file specifying the resource/module to target 
    secrets: {}
```

---

### 🧩 Inputs

| Name                  | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `provider`            | Cloud provider (`aws`, `gcp`, `azurerm`, etc.)                             |
| `working_directory`   | Terraform code directory (relative path)                                    |
| `aws_region`          | AWS region for deployment                                                   |
| `terraform_version`   | Terraform version (e.g., `1.3.6`)                                           |
| `destroy`             | Set to `true` to perform `terraform destroy`                                |
| `approvers`           | GitHub usernames who must approve the plan                                 |
| `target_environment`  | GitHub Environment (must be configured with reviewers)                      |
| `target_file`         | Path to file specifying the resource/module to target                       |

---

### 🔐 Secrets (for AWS)

| Secret Name             | Description                                              |
|--------------------------|----------------------------------------------------------|
| `AWS_ACCESS_KEY_ID`      | AWS access key (fallback if not using OIDC)             |
| `AWS_SECRET_ACCESS_KEY`  | AWS secret access key                                   |
| `AWS_SESSION_TOKEN`      | (Optional) AWS session token                            |
| `env-vars`               | Multiline key=value pairs passed as environment vars    |

---

### 🧾 Target File Format

The target file should contain your resource/module in standard Terraform targeting syntax, e.g.:

```
module.vpc
```

You may also dynamically pass the target via inputs instead of using a file.

---

### 🛡️ Manual Approval Process

Before running `terraform apply` or `destroy`, the workflow will:

- Generate a plan
- Pause for manual review
- Require approval from specified `approvers` (and GitHub Environment reviewers)

This ensures **no infra change happens without validation**.

---

### 🚀 Example Execution Flow

1. Modify `.github/workflows/terraform_target_module_details.txt` with your target
2. Push changes to the `feat/terraform_workflow-target` branch
3. GitHub Actions triggers workflow
4. Review the Terraform plan
5. Approve the workflow in GitHub UI
6. Infra will be applied or destroyed as per config

---

> ✅ This workflow is ideal for **granular, auditable, and controlled deployments** in cloud infrastructure environments.