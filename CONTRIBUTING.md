## Usage of StarcounterClientFiles 3.x in Level1 build automation

Whatever is pushed on branch `3.x`, will be bundled in the Starcounter installer by the Level1 build automation. See [the announcement](https://github.com/Starcounter/AdminTrack/issues/438) for more details. 

The name of the StarcounterClientFiles branch used by the Level1 build is configured via the `GIT_CLIENTFILES_BRANCH` parameter in TeamCity.


## Releasing of a new version of StarcounterClientFiles 3.x

The developer process of releasing of a new version of StarcounterClientFiles `3.x` to Starcounter:

1. Commit changes to individual client-side package's repo, like https://github.com/Starcounter/starcounter-include, and release a version there,
2. Bump files in a feature branch of StarcounterClientFiles started from `3.x`, either:
   - by updating `bower.json` and running `bower install`,
   - or by calling `bower install --save packagename[#version]`
3. Update `bower-list.txt` by calling `bower list > bower-list.txt`
4. Build the project using `build.bat` or VS. This triggers `msbuild`, which also triggers `npm run build`
5. When you push to a feature branch of StarcounterClientFiles, TeamCity will run a integration test of this branch with KitchenSink and Blending. Make sure these tests are passing.
6. Make a PR for someone to review the complete set of changes.
7. Still in the feature branch, release new version (3.x) of StarcounterClientFiles on GitHub. Remember to write the release notes.
8. Still in the feature branch, publish a package of this version to App Warehouse (built with Starcounter 2.4)
9. Merge the PR to StarcounterClientFiles branch `3.x`.
   - at this point, a new daily build of Starcounter 2.4 is started
   - it will be detected and included in the next nightly build of Starcounter 2.4
