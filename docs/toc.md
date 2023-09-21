## [toc Workflow](https://github.com/clouddrove/github-shared-workflows/blob/master/.github/workflows/toc.yml)

This workflow is used to update Table Of Content(TOC) of modules in readme, It utilizes the workflows defined in `.github/workflows/toc.yml`

#### Usage
- With the use of this shared workflow, upgradation of toc for some modules are automate instead of manually updating.
- Creating readme file on github for toc automatically if any module are changed or updated or created.


#### Example

```yaml
name: toc
permissions: write-all
on:
  schedule:
     - cron:  '*/5 * * * *' # schedule cron job (here set every 5 minutes)

  workflow_dispatch:

jobs:
  prod:
    uses: clouddrove/github-shared-workflows/.github/workflows/toc.yml@master   
    with:  
        modules: 'terraform-aws,terraform-azure,terraform-gcp,docker,ansible,tools' # modules for list in toc
        username:       # add git username
        email:          # add git email
    secrets:
        github-token:   # add github token
```