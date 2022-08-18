# PayStream Monorepo


## TL;DR

This is where [Paystream](https://paystream.io) gets built.

## Documentation

Extensive documentation is available [here](http://community.optimism.io/).

## Community

Come hang on our very active [discord](https://discord.bepro.io) 🔴✨

## Contributing

Read through [CONTRIBUTING.md](./CONTRIBUTING.md) for a general overview of our contribution process.


## Directory Structure

<pre>
root
├── <a href="./frontend">Frontend App</a>
├── <a href="./sdk">Paystream Smart Contract SDK</a>

### Overview

We generally follow [this Git branching model](https://nvie.com/posts/a-successful-git-branching-model/).
Please read the linked post if you're planning to make frequent PRs into this repository (e.g., people working at/with Optimism).

### The `master` branch

The `master` branch contains the code for our latest "stable" releases.
Updates from `master` always come from the `develop` branch.
We only ever update the `master` branch when we intend to deploy code within the `develop` to the Optimism mainnet.
Our update process takes the form of a PR merging the `develop` branch into the `master` branch.

### The `develop` branch

Our primary development branch is [`develop`](https://github.com/ethereum-optimism/optimism/tree/develop/).
`develop` contains the most up-to-date software that remains backwards compatible with our latest experimental [network deployments](https://community.optimism.io/docs/useful-tools/networks/).
If you're making a backwards compatible change, please direct your pull request towards `develop`.


### Release new versions

Developers can release new versions of the software by adding changesets to their pull requests using `yarn changeset`. Changesets will persist over time on the `develop` branch without triggering new version bumps to be proposed by the Changesets bot. Once changesets are merged into `master`, the bot will create a new pull request called "Version Packages" which bumps the versions of packages. The correct flow for triggering releases is to update the base branch of these pull requests onto `develop` and merge them, and then create a new pull request to merge `develop` into `master`. Then, the `release` workflow will trigger the actual publishing to `npm` and Docker hub.

Be sure to not merge other pull requests into `develop` if partially through the release process. This can cause problems with Changesets doing releases and will require manual intervention to fix it.

### Release candidate branches

Branches marked `release/X.X.X` are **release candidate branches**.
Changes that are not backwards compatible and all changes to contracts within `packages/contracts/contracts` MUST be directed towards a release candidate branch.
Release candidates are merged into `develop` and then into `master` once they've been fully deployed.
We may sometimes have more than one active `release/X.X.X` branch if we're in the middle of a deployment.
See table in the **Active Branches** section above to find the right branch to target.

### Releasing new versions

Developers can release new versions of the software by adding changesets to their pull requests using `yarn changeset`. Changesets will persist over time on the `develop` branch without triggering new version bumps to be proposed by the Changesets bot. Once changesets are merged into `master`, the bot will create a new pull request called "Version Packages" which bumps the versions of packages. The correct flow for triggering releases is to re-base these pull requests onto `develop` and merge them, and then create a new pull request to merge `develop` onto `master`. Then, the `release` workflow will trigger the actual publishing to `npm` and Docker hub.
