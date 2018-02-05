This repo is the source of client files distributed with Starcounter at `%StarcounterBin%/ClientFiles`. It can also be ran as an app, overwriting the default client files distributed with Starcounter.

## This branch

The branch `2.x` contains Web Components V1 & Polymer 2 client-side libraries intended as:

- the default client-side libraries supported in Starcounter 2.4

There is also another branch, `1.x`, which contains Web Components V0 and Polymer 1.

## Development

The developer process of upgrading client files in Starcounter looks like follows:

1. Commit changes to individual client-side package's repo, like https://github.com/Starcounter/starcounter-include, and release a version there,
2. Bump files in a feature branch started from `2.x` in [this repo](https://github.com/Starcounter/StarcounterClientFiles) either,
   - by updating `bower.json` and running `bower install`,
   - or `calling `bower install --save packagename[#version]`
3. Update `bower-list.txt` by calling `bower list > bower-list.txt`
4. For every commit in the feature branch of StarcounterClientFiles, TeamCity will run a integration test of this branch with KitchenSink and Blending. Make sure these tests are passing.
5. Make a PR for someone to review the complete set of changes.
6. Still in the feature branch, release new version (2.x) of StarcounterClientFiles. Remember to write the release notes.
7. Still in the feature branch, publish a package of this version to App Warehouse (built with Starcounter 2.4)
8. Merge the PR to `2.x`
   - the code at the `2.x` branch is the Starcounter Level1 build automation source for the client files. See [the announcement](https://github.com/Starcounter/AdminTrack/issues/438) for more details. The name of the branch is configured via `GIT_CLIENTFILES_BRANCH` in Level1
   
