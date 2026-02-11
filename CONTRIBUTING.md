# Contributing to GitHub Shared Workflows

First off, thank you for considering contributing to GitHub Shared Workflows! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Workflow file and version
- Environment details

### 💡 Suggesting Enhancements

We welcome feature requests! Please include:
- Use case description
- Proposed solution
- Examples of how it would be used

### 📝 Adding New Workflows

1. Follow the prefix naming convention:
   - `tf-*` for Terraform workflows
   - `cf-*` for CloudFormation workflows
   - `pr-*` for PR-related workflows
   - `aws-*` for AWS-specific workflows
   - `gcp-*` for GCP-specific workflows
   - `security-*` for security scanning workflows
   - `release-*` for release workflows
   - `notify-*` for notification workflows
   - `docker-*` for Docker workflows
   - `helm-*` for Helm workflows
   - `yl-*` for YAML lint workflows

2. Create comprehensive documentation in `docs/` directory
3. Add examples for all major use cases
4. Update README.md with the new workflow
5. Ensure all inputs and secrets are documented

### 🔧 Development Process

1. Fork the repository
2. Create a feature branch (`feat/your-feature-name`)
3. Make your changes
4. Add/update tests if applicable
5. Update documentation
6. Submit a pull request

### 📋 Pull Request Checklist

- [ ] Workflow follows naming conventions
- [ ] Documentation is complete
- [ ] Examples are provided
- [ ] README.md is updated
- [ ] Code is tested
- [ ] No breaking changes (or clearly documented)

### 🎯 Code Style

- Use clear, descriptive names
- Add comments for complex logic
- Follow existing workflow patterns
- Keep workflows focused and reusable

## Questions?

Feel free to open a discussion or reach out to maintainers!
