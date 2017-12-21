This repo is supposed to replace [/Starcounter/level1/tree/develop/src/BuildSystem/ClientFiles](https://github.com/Starcounter/level1/tree/develop/src/BuildSystem/ClientFiles). At this point it does not replace it yet, but it is the source of truth for it.

## This branch

The branch `master` contains Web Components V0 & Polymer 1 client-side libraries intended as:

- the default and only client-side libraries supported in Starcounter 2.3
- the way to downgrade Starcounter 2.4 to WCv0 & P1)

There is also another branch, `master-2.4`, which contains Web Components V1 and Polymer 2.

## Development

Currently, the developer process looks like follows:

1. Commit changes to individual client-side package's repo, like https://github.com/Starcounter/starcounter-include, and release a version there,
2. Bump files in a feature branch started from `master` in [this repo](https://github.com/Starcounter/StarcounterClientFiles) either,
   - by updating `bower.json` and running `bower install`,
   - or `calling `bower install --save packagename[#version]`
3. Update `bower-list.txt` by calling `bower list > bower-list.txt`
4. Make a PR for someone to review the complete set of changes.
5. As soon as the PR is merged, release new version (1.x) of StarcounterClientFiles (remeber to write the release notes)
6. Publish a package of this version to App Warehouse (built with Starcounter 2.4)
7. Copy manually to a custom branch at level1 (forked from `v2.3`)
8. Build level1 branch in TeamCity
9. Build KitchenSink, Website and CompositionProvider with custom level1 build (pick 2.3 task)
10. If all tests pass, create a PR to level1 (remember to bump `CHANGELOG.md`)
11. You don't need a reviewer for this PR. Simply do something similar to what @warpech did in https://github.com/Starcounter/level1/pull/4420 and give link to the PR in StarcounterClientFiles where it was reviewed in more detail.
12. Merge the PR to `v2.3` and then merge `v2.3` to `develop`. Take proper steps to ensure that no unintended files were overwritten in `develop`. If yes, solve the conflict.
