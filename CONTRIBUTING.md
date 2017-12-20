This repo is supposed to replace [/Starcounter/level1/tree/develop/src/BuildSystem/ClientFiles](https://github.com/Starcounter/level1/tree/develop/src/BuildSystem/ClientFiles)


## Development

Currently, the developer process looks like follows:


1. Commit changes to individual client-side package's repo, like https://github.com/Starcounter/starcounter-include, and release a version there,
2. Bump files in [this repo](https://github.com/Starcounter/StarcounterClientFiles) either,
   - by updating `bower.json` and running `bower install`,
   - or `calling `bower install --save packagename[#version]`
3. Update `bower-list.txt` by calling `bower list > bower-list.txt`
4. Release new version of StarcounterClientFiles
5. Merge/copy manually to a custom branch at level1 (forked from 2.4 if applicable)
6. Build level1 branch in TeamCity,
7. Build Kitchensink with custom level1 build (pick 2.4 task if applicable)
8. If all tests pass, create a PR to level1.
