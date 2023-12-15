# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.9] - 2023-12-15
### :sparkles: New Features
- [`163865b`](https://github.com/clouddrove/github-shared-workflows/commit/163865be402b05d5e4a683de1373165c294fa868) - Updated GCP Authentication step with required attributes *(PR [#102](https://github.com/clouddrove/github-shared-workflows/pull/102) by [@VishwajitNagulkar](https://github.com/VishwajitNagulkar))*
- [`05ebccf`](https://github.com/clouddrove/github-shared-workflows/commit/05ebccf87b941a366432b9580118cef261c21d27) - Added GCP authentication step for tf-checks *(PR [#103](https://github.com/clouddrove/github-shared-workflows/pull/103) by [@Tanveer143s](https://github.com/Tanveer143s))*
- [`1ef2195`](https://github.com/clouddrove/github-shared-workflows/commit/1ef2195c5247d3f207e30fff2d33f39e1075eec6) - Add auto-approve and merge shared workflow. *(PR [#107](https://github.com/clouddrove/github-shared-workflows/pull/107) by [@vaibhav7797](https://github.com/vaibhav7797))*

### :construction_worker: Build System
- [`6f7c6fc`](https://github.com/clouddrove/github-shared-workflows/commit/6f7c6fc4d3d935cc44a84c5d6f15dc601cc4a767) - **deps**: bump actions/github-script from 6 to 7 *(PR [#101](https://github.com/clouddrove/github-shared-workflows/pull/101) by [@dependabot[bot]](https://github.com/apps/dependabot))*

### :memo: Documentation Changes
- [`7933c1b`](https://github.com/clouddrove/github-shared-workflows/commit/7933c1b806bdba266a8278da53bcbfc51974c8b4) - update CHANGELOG.md for 1.0.8 *(commit by [@clouddrove-ci](https://github.com/clouddrove-ci))*


## [1.0.8] - 2023-11-16
### :sparkles: New Features
- [`4ba1097`](https://github.com/clouddrove/github-shared-workflows/commit/4ba109727fcc302269347fe7f4c5c0f74bd5a77a) - Created shared workflow for readme generator *(PR [#100](https://github.com/clouddrove/github-shared-workflows/pull/100) by [@VishwajitNagulkar](https://github.com/VishwajitNagulkar))*

### :construction_worker: Build System
- [`5d41248`](https://github.com/clouddrove/github-shared-workflows/commit/5d412489a03faa352d25c344e0ea6c28a8f54c4e) - **deps**: bump hashicorp/setup-terraform from 2 to 3 *(PR [#99](https://github.com/clouddrove/github-shared-workflows/pull/99) by [@dependabot[bot]](https://github.com/apps/dependabot))*

### :memo: Documentation Changes
- [`0ae9661`](https://github.com/clouddrove/github-shared-workflows/commit/0ae966131a4c1a0daf689e4f790adb9c5fa13fcd) - update CHANGELOG.md for 1.0.7 *(commit by [@clouddrove-ci](https://github.com/clouddrove-ci))*


## [1.0.7] - 2023-10-31
### :sparkles: New Features
- [`c92588b`](https://github.com/clouddrove/github-shared-workflows/commit/c92588b84705dc33fa5527e4a11145a1861b60c9) - Added attribute for passing environment variables as a input *(commit by [@VishwajitNagulkar](https://github.com/VishwajitNagulkar))*
- [`f85bc2f`](https://github.com/clouddrove/github-shared-workflows/commit/f85bc2f34ec51b8eff2a6bae14d73f0048628d7f) - added uses of env-var secret in readme *(commit by [@VishwajitNagulkar](https://github.com/VishwajitNagulkar))*
- [`6b14cb1`](https://github.com/clouddrove/github-shared-workflows/commit/6b14cb1fdc33f10fb1ba0efa744e1f04ca25d0c9) - 🚀 Added a feature to pass environment variables in Terraform workflows and TFDrift workflows. *(PR [#89](https://github.com/clouddrove/github-shared-workflows/pull/89) by [@VishwajitNagulkar](https://github.com/VishwajitNagulkar))*
- [`8bc1e51`](https://github.com/clouddrove/github-shared-workflows/commit/8bc1e51e4a7f204c8b1ccce62309c4f13858940b) - :rocket: Created cloudformation workflow and its readme *(PR [#90](https://github.com/clouddrove/github-shared-workflows/pull/90) by [@Tanveer143s](https://github.com/Tanveer143s))*
- [`68b5370`](https://github.com/clouddrove/github-shared-workflows/commit/68b53701e992da467f627906f9c992bafc2ee986) - 🚀 Docker scout reusable workflow *(PR [#96](https://github.com/clouddrove/github-shared-workflows/pull/96) by [@VishwajitNagulkar](https://github.com/VishwajitNagulkar))*
- [`9e9106e`](https://github.com/clouddrove/github-shared-workflows/commit/9e9106e93b06b3813b619bda628085c33ab34e30) - :rocket: Created cloudformation-stackset workflow and readme *(PR [#95](https://github.com/clouddrove/github-shared-workflows/pull/95) by [@Tanveer143s](https://github.com/Tanveer143s))*
- [`c73c8b5`](https://github.com/clouddrove/github-shared-workflows/commit/c73c8b5394b9dc2da6a05adb31dd017d5a8443d5) - updated instance region for list command *(PR [#98](https://github.com/clouddrove/github-shared-workflows/pull/98) by [@Tanveer143s](https://github.com/Tanveer143s))*

### :construction_worker: Build System
- [`c608cdc`](https://github.com/clouddrove/github-shared-workflows/commit/c608cdc6ea0e5bbc4d88d65239f22d242c4a8daa) - **deps**: bump aws-actions/configure-aws-credentials from 3 to 4 *(PR [#87](https://github.com/clouddrove/github-shared-workflows/pull/87) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`51d21c1`](https://github.com/clouddrove/github-shared-workflows/commit/51d21c170e1badd8c0a21456675df32b19e01b59) - **deps**: bump terraform-linters/setup-tflint from 3 to 4 *(PR [#86](https://github.com/clouddrove/github-shared-workflows/pull/86) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`5a5757d`](https://github.com/clouddrove/github-shared-workflows/commit/5a5757d8c9a4a730425592d476b2817a80322cbd) - **deps**: bump actions/checkout from 2 to 4 *(PR [#91](https://github.com/clouddrove/github-shared-workflows/pull/91) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`eba9f0c`](https://github.com/clouddrove/github-shared-workflows/commit/eba9f0c4867969a3f774a8ee971d142f7b3ea555) - **deps**: bump stefanzweifel/git-auto-commit-action from 4 to 5 *(PR [#92](https://github.com/clouddrove/github-shared-workflows/pull/92) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`0f82da9`](https://github.com/clouddrove/github-shared-workflows/commit/0f82da9b6d5ebc24a7405a85871dcfe4276322a3) - **deps**: bump aws-actions/amazon-ecr-login from 1 to 2 *(PR [#93](https://github.com/clouddrove/github-shared-workflows/pull/93) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`1c231ea`](https://github.com/clouddrove/github-shared-workflows/commit/1c231ea7cd61f58d77fef4ba3af6efa22ff6f71d) - **deps**: bump clouddrove/github-actions from 9.0.2 to 9.0.3 *(PR [#94](https://github.com/clouddrove/github-shared-workflows/pull/94) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`ba5eb58`](https://github.com/clouddrove/github-shared-workflows/commit/ba5eb5826dfd40be99fcf8780b1c2736912d1bbc) - **deps**: bump docker/setup-buildx-action from 2.5.0 to 3.0.0 *(PR [#97](https://github.com/clouddrove/github-shared-workflows/pull/97) by [@dependabot[bot]](https://github.com/apps/dependabot))*

### :memo: Documentation Changes
- [`38907f6`](https://github.com/clouddrove/github-shared-workflows/commit/38907f61aef1517478572b947db4980e5c8845a0) - update CHANGELOG.md for 1.0.6 *(commit by [@clouddrove-ci](https://github.com/clouddrove-ci))*


## [1.0.6] - 2023-09-27
### :sparkles: New Features
- [`bb25820`](https://github.com/clouddrove/github-shared-workflows/commit/bb2582034586acc7e2e5838e9e16e53ff79143d4) - Added workflow for cloudformation linter and security scan *(PR [#83](https://github.com/clouddrove/github-shared-workflows/pull/83) by [@VishwajitNagulkar](https://github.com/VishwajitNagulkar))*

### :construction_worker: Build System
- [`58b7608`](https://github.com/clouddrove/github-shared-workflows/commit/58b76089a047584da0b2d36eecb8ab7864619588) - **deps**: bump docker/setup-qemu-action from 2 to 3 *(PR [#79](https://github.com/clouddrove/github-shared-workflows/pull/79) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`ca5ca81`](https://github.com/clouddrove/github-shared-workflows/commit/ca5ca81c3d78731cdb1faddf87ef5ae1617dce55) - **deps**: bump docker/login-action from 2 to 3 *(PR [#78](https://github.com/clouddrove/github-shared-workflows/pull/78) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`c8a71ea`](https://github.com/clouddrove/github-shared-workflows/commit/c8a71ea677e6f88a8d0978232eedbf502db7a485) - **deps**: bump docker/build-push-action from 4 to 5 *(PR [#77](https://github.com/clouddrove/github-shared-workflows/pull/77) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`11594c7`](https://github.com/clouddrove/github-shared-workflows/commit/11594c73244ab1343eca9ddb76af43fbb6d9f2b2) - **deps**: bump docker/setup-buildx-action from 2 to 3 *(PR [#82](https://github.com/clouddrove/github-shared-workflows/pull/82) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`ebc9389`](https://github.com/clouddrove/github-shared-workflows/commit/ebc9389cc511c91cce4c70870574d88758453abd) - **deps**: bump aws-actions/configure-aws-credentials from 3 to 4 *(PR [#81](https://github.com/clouddrove/github-shared-workflows/pull/81) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`011b5ce`](https://github.com/clouddrove/github-shared-workflows/commit/011b5cebb263e3fdb0fcdae68d5910755c07d049) - added terraform version and aws credentials dynamically *(PR [#84](https://github.com/clouddrove/github-shared-workflows/pull/84) by [@vaibhav7797](https://github.com/vaibhav7797))*


## [1.0.5] - 2023-09-11
### :construction_worker: Build System
- [`b22362c`](https://github.com/clouddrove/github-shared-workflows/commit/b22362c3cf51643a935c00efc35a15c897f282fa) - **deps**: bump infracost/actions from 2.0.0 to 2.1.0 *(PR [#73](https://github.com/clouddrove/github-shared-workflows/pull/73) by [@dependabot[bot]](https://github.com/apps/dependabot))*
- [`c95eaf9`](https://github.com/clouddrove/github-shared-workflows/commit/c95eaf9e6deb13466c66ea49918c4c1d55bee92c) - **deps**: bump actions/checkout from 3 to 4 *(PR [#74](https://github.com/clouddrove/github-shared-workflows/pull/74) by [@dependabot[bot]](https://github.com/apps/dependabot))*


[1.0.5]: https://github.com/clouddrove/github-shared-workflows/compare/1.0.4...1.0.5
[1.0.6]: https://github.com/clouddrove/github-shared-workflows/compare/1.0.5...1.0.6
[1.0.7]: https://github.com/clouddrove/github-shared-workflows/compare/1.0.6...1.0.7
[1.0.8]: https://github.com/clouddrove/github-shared-workflows/compare/1.0.7...1.0.8
[1.0.9]: https://github.com/clouddrove/github-shared-workflows/compare/1.0.8...1.0.9