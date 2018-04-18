## Testing your PR in TeamCity

For your feature branch to be honoured by TeamCity, its name needs to start with `1.x` (eg: `1.x/fix-something`).

## Usage of StarcounterClientFiles 1.x in Level1 build automation

Whatever is pushed on branch `1.x`, will be bundled in the Starcounter installer by the Level1 build automation. See [the announcement](https://github.com/Starcounter/AdminTrack/issues/438) for more details. 

The name of the StarcounterClientFiles branch used by the Level1 build is configured via the `GIT_CLIENTFILES_BRANCH` parameter in TeamCity.


## Releasing of a new version of StarcounterClientFiles 1.x

The developer process of releasing of a new version of StarcounterClientFiles `1.x` to Starcounter:

1. Commit changes to individual client-side package's repo, like https://github.com/Starcounter/starcounter-include, and release a version there,
2. Bump files in a feature branch of StarcounterClientFiles started from `1.x`, either:
   - by updating `bower.json` and running `bower install`,
   - or by calling `bower install --save packagename[#version]`
3. Update `bower-list.txt` by calling `bower list > bower-list.txt`
4. When you push to a feature branch of StarcounterClientFiles, TeamCity will run a integration test of this branch with KitchenSink, WebsiteProvider and CompositionProvider. Make sure these tests are passing.
5. Make a PR for someone to review the complete set of changes.
6. Still in the feature branch, release new version (1.x) of StarcounterClientFiles on GitHub. Remember to write the release notes.
7. Merge the PR to StarcounterClientFiles branch `1.x`.
   - at this point, a new daily build of Starcounter 2.3 is started
   - it will be detected and included in the next nightly build of Starcounter 2.3
