# Security Policy

## Supported Versions

We actively support the latest version of all workflows. For security updates, we recommend using the latest release or a specific version tag.

## Reporting a Vulnerability

If you discover a security vulnerability, please **DO NOT** open a public issue. Instead, please email us at [security@clouddrove.com](mailto:security@clouddrove.com) with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work with you to resolve the issue before making it public.

## Security Best Practices

When using these workflows:

1. **Never commit secrets** - Always use GitHub Secrets
2. **Use least privilege** - Grant only necessary permissions
3. **Pin workflow versions** - Use specific tags instead of `@master`
4. **Review workflow code** - Understand what workflows do before using them
5. **Keep workflows updated** - Regularly update to latest versions
6. **Audit regularly** - Review workflow permissions and usage

## Security Updates

Security updates will be:
- Released as patch versions
- Documented in CHANGELOG.md
- Tagged with `security` label
- Communicated via GitHub Security Advisories
