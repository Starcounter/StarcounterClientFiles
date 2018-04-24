## Testing your PR in TeamCity

For your feature branch to be honoured by TeamCity, its name needs to start with `3.x` (eg: `3.x/fix-something`).

## Usage of StarcounterClientFiles 3.x in Level1 build automation

Whatever is pushed on branch `3.x`, will be bundled in the Starcounter installer by the Level1 build automation. See [the announcement](https://github.com/Starcounter/AdminTrack/issues/438) for more details. 

The name of the StarcounterClientFiles branch used by the Level1 build is configured via the `GIT_CLIENTFILES_BRANCH` parameter in TeamCity.

## Releasing of a new version of StarcounterClientFiles 3.x

The developer process of releasing of a new version of StarcounterClientFiles `3.x` to Starcounter:

0. Make sure you have [`npm`](https://nodejs.org/en/), `bower`(`npm install -g bower`) and [`nuget` cli](https://www.nuget.org/downloads) installed,
1. Commit changes to individual client-side package's repo, like https://github.com/Starcounter/starcounter-include, and release a version there,
2. Bump files in a feature branch of StarcounterClientFiles started from `3.x`, either:
   - by updating `bower.json` and running `bower install`,
   - or by calling `bower install --save packagename[#version]`
3. Update `bower-list.txt` by calling `bower list > bower-list.txt`
4. Build the project using `build.bat` or VS. This triggers `msbuild`, which also triggers `npm run build`
5. When you push to a feature branch of StarcounterClientFiles, TeamCity will run a integration test of this branch with KitchenSink and Blending. Make sure these tests are passing.
6. Make a PR for someone to review the complete set of changes.
7. Still in the feature branch, push a tag (3.x.y), and add release notes to GitHub release of StarcounterClientFiles.
8. Still in the feature branch, publish a package of this version to App Warehouse (built with Starcounter 2.4)
9. Execute [package.bat](https://github.com/Starcounter/StarcounterClientFiles/blob/3.x/package.bat)
    * this will create a nuget package of StarcounterClientFiles called `Starcounter.ClientFiles` to folder `/StarcounterClientFiles/artifacts/Starcounter.ClientFiles.X.Y.Z.nupkg`
10. Execute [push_nuget_package.bat](https://github.com/Starcounter/StarcounterClientFiles/blob/3.x/push_nuget_package.bat)
    * Requires full path to nupkg file + MyGet api key: 
    
    ```
    push_nuget_package.bat C:\StarcounterClientFiles\artifacts\Starcounter.ClientFiles.X.Y.Z.nupkg XXXXXXXXXXXXXXXXXXXXXX
    ```
    
    Note that the newly added functionality is executed through Cake scripts, which makes it possible to execute through Bifrost as well. **This means that this new workflow adds the `nuget.exe` dependency. Simply add the directory where your `nuget.exe` file is located to `%PATH%` environment variable**.

11. Merge the PR to StarcounterClientFiles branch `3.x`.
   - at this point, a new daily build of Starcounter 2.4 is started
   - it will be detected and included in the next nightly build of Starcounter 2.4

12. Check the next section and decide if you need to follow the instructions in it.

#### Bumping level1 to use the new version

Starcounter Level1 pulls this app as a Nuget package as a source for Client Files. But level1 is locked to a certain version of this app. This configuration in level can be found in [this file](https://github.com/Starcounter/level1/blob/develop/src/BuildSystem/ClientFiles/ClientFiles.csproj). If you release a version and want it to be pulled by level1, you must bump [this line](https://github.com/Starcounter/level1/blob/develop/src/BuildSystem/ClientFiles/ClientFiles.csproj#L9). Please make sure to bump level1 only after you release SCF to avoid broken level1 builds.

You may also use wildcards (eg `3.*`), in which case the SCF package will be pulled immediately after it's released (assuming it matches the wildcard) and it will be bundled within the next release of Starcounter. Kindly release with care.
