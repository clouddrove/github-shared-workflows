# Clouddrove Agent Naoru Workflow

## Overview

The Clouddrove Agent Naoru workflow (`agent-naoru.yml`) diagnoses a failed job in the same GitHub Actions run with an LLM and posts the result as a sticky pull request comment.

It is designed to run after your real validation, build, or test job fails. The workflow fetches the failed job logs directly from the GitHub Actions job log API, sends the tailed logs to the configured provider, and writes the diagnosis to the PR or workflow summary.

## Features

- Reusable `workflow_call` workflow for pull request pipelines.
- Posts one sticky PR comment and updates it on reruns.
- Writes to the workflow Step Summary when there is no pull request.
- Supports OpenRouter, OpenAI, Anthropic, Gemini, xAI, Groq, and custom OpenAI-compatible endpoints.
- Defaults to OpenRouter with `deepseek/deepseek-v4-flash` for a low-cost DeepSeek model.
- Uses `actions: read`, `contents: read`, and `pull-requests: write` permissions.

## Required Secret

Store the provider API key in the caller repository. For the default OpenRouter setup, use:

```bash
gh secret set OPENROUTER_API_KEY --repo your-org/your-repo
```

## Example Caller Workflow

```yaml
---
name: Terraform Checks

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  actions: read
  contents: read
  pull-requests: write

jobs:
  terraform-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.9.8

      - name: Terraform init
        run: terraform -chdir=terraform init -backend=false

      - name: Terraform validate
        run: terraform -chdir=terraform validate

  agent-naoru:
    needs: [terraform-check]
    if: ${{ always() && needs.terraform-check.result == 'failure' }}
    uses: clouddrove/github-shared-workflows/.github/workflows/agent-naoru.yml@v2
    with:
      failed-job-name: terraform-check
    secrets:
      API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
```

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `provider` | `openrouter` | LLM provider: `anthropic`, `openai`, `gemini`, `openrouter`, `xai`, `groq`, or `custom`. |
| `model` | `deepseek/deepseek-v4-flash` | Model id sent to the selected provider. |
| `base-url` | `""` | API base URL override. Required when `provider` is `custom`. |
| `prompt` | Built-in DevOps prompt | Prompt template. Supports `{{LOG}}`, `{{JOB_NAME}}`, and `{{REPO}}`. |
| `max-log-lines` | `500` | Number of failed job log lines to send. |
| `max-tokens` | `600` | Response token cap. |
| `failed-job-name` | `""` | Failed job name to diagnose. If blank, the first failed job is used. |
| `post-comment` | `true` | Post the diagnosis to the PR when the event is a pull request. |
| `sticky` | `true` | Update the same PR comment on reruns. |

## Secrets

| Secret | Required | Description |
|--------|----------|-------------|
| `API_KEY` | Yes | API key for the selected provider. For OpenRouter, pass `${{ secrets.OPENROUTER_API_KEY }}`. |

## OpenRouter DeepSeek Example

```yaml
with:
  provider: openrouter
  model: deepseek/deepseek-v4-flash
  failed-job-name: terraform-check
secrets:
  API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
```

## Notes

- The caller workflow must grant `actions: read` so Clouddrove Agent Naoru can fetch failed job logs.
- The caller workflow must grant `pull-requests: write` if PR comments should be posted.
- The diagnosis workflow should depend on the job it diagnoses and use an `always()` failure condition.
...
