This repo is supposed to replace [/Starcounter/level1/tree/develop/src/BuildSystem/ClientFiles](https://github.com/Starcounter/level1/tree/develop/src/BuildSystem/ClientFiles). At this point it does not replace it yet, but it is the source of truth for it.

## This branch

The branch `2.x` contains Web Components V1 & Polymer 2 client-side libraries intended as:

- the default client-side libraries supported in Starcounter 2.4

There is also another branch, `1.x`, which contains Web Components V0 and Polymer 1.

## Development

Currently, the developer process looks like follows:

1. Commit changes to individual client-side package's repo, like https://github.com/Starcounter/starcounter-include, and release a version there,
2. Bump files in a feature branch started from `2.x` in [this repo](https://github.com/Starcounter/StarcounterClientFiles) either,
   - by updating `bower.json` and running `bower install`,
   - or `calling `bower install --save packagename[#version]`
3. Update `bower-list.txt` by calling `bower list > bower-list.txt`
4. Make a PR for someone to review the complete set of changes.
5. As soon as the PR is merged, release new version (2.x) of StarcounterClientFiles (remember to write the release notes)
6. Publish a package of this version to App Warehouse (built with Starcounter 2.4)
7. Copy manually to a custom branch at level1 (forked from `develop`)
8. Build level1 branch in TeamCity
9. Build KitchenSink, Website and CompositionProvider with custom level1 build (pick 2.4 task)
10. If all tests pass, create a PR to level1 (remember to bump `CHANGELOG-Develop.md`)
11. You don't need a reviewer for this PR. Simply do something similar to what @warpech did in https://github.com/Starcounter/level1/pull/4420 and give the link to the PR in StarcounterClientFiles where it was reviewed in more detail.
12. Merge the PR to `develop`.

**Warning!** Before we decide to include Polymer 2 in Starcounter 2.4, omit the steps 7-10.
