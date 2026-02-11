# 📖 Gemini Code Review Workflow Guide

## 🎯 Objective
Automate AI-powered code reviews for every Pull Request using Google’s Gemini model.  
This ensures consistent, high-quality review feedback on style, correctness, performance, and best practices.

---

## ✨ Features
- 🚀 **Auto Review** — Runs automatically on PR open, update, or reopen.  
- 🤖 **AI Suggestions** — Uses Google Gemini (`gemini-2.5-pro`) for detailed review.  
- 📂 **Diff Based** — Reviews only the code changes in the PR.  
- 🔄 **Reusable Workflow** — Centralized workflow callable from multiple repos.  
- 🔑 **Configurable** — Supports overriding model or GitHub token if needed.  

---

## ❓ Why use this?
- ✅ Catch issues early without waiting for human reviewers.  
- ✅ Standardize review quality across repos.  
- ✅ Reduce review time for repetitive issues (formatting, common bugs, performance hints).  
- ✅ Easy to integrate and maintain via a reusable workflow.  

---

## 🔑 Setup: Google API Key
The Gemini CLI requires a Google API key.

1. Visit **[Google AI Studio](https://aistudio.google.com/)**  
2. Click **Create API Key**  
3. Copy the key and add it to your repo’s GitHub secrets:  
   - Navigate to **Settings → Secrets and variables → Actions**  
   - Add a new secret:  
     - **Name:** `GEMINI_API_KEY`  
     - **Value:** *(your API key from Google AI Studio)*  

---

## ✍️ Customizing the Review Prompt

The **review prompt** controls *how Gemini reviews your code*.  
By default, a general-purpose prompt is used, but you can override it in the caller workflow.

### 🔹 Example
```yaml
with:
  review_prompt: |
    🧑‍💻 You are an AI code reviewer. Review the provided **git diff** in pr.diff.
    Focus on:
      - 📂 Mentioning the file name and line number
      - ⚠️ Describing the issue clearly
      - ❓ Explaining why it is problematic
      - 🛠 Suggesting a fix
    If multiple issues exist, list them separately.
```
---

## ▶️ Example Caller File

```yaml
---
name: PR Gemini Review 🚀

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  call-gemini-review:
    name: 🤖 Run Gemini Code Review
    uses: clouddrove/github-shared-workflows/.github/workflows/gemini-code-review.yml@master
    with:
      gemini_model: "gemini-2.5-pro"   # ✨ optional, default already set
      github_token: ${{ github.TOKEN }}   # 🔑 optional override
      review_prompt: |
        🧑‍💻 You are an AI code reviewer. Review the provided **git diff** in pr.diff.
        For each issue you find:
          - 📂 Mention the file name and line number
          - ⚠️ Describe the issue
          - ❓ Explain why it is problematic
          - 🛠 Suggest a fix
        If multiple issues exist, list them separately.
    secrets:
      GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

## 📌 Notes

- Default GitHub token (github.TOKEN) is used unless overridden.
- You can change the model via with.gemini_model.
- Works best on small to medium PRs — large diffs may exceed token limits.