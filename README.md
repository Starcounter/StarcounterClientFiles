# StarcounterClientFiles

This repo is the source of client files distributed with Starcounter at `%StarcounterBin%/ClientFiles`. It can also be ran as an app, overwriting the default client files distributed with Starcounter.

## The branches in this repo

The branch [`1.x`](https://github.com/Starcounter/StarcounterClientFiles/tree/1.x) contains Web Components V0, Polymer 1, Bootstrap. It is the source of the client-side libraries bundled with Starcounter 2.3.

The branch [`2.x`](https://github.com/Starcounter/StarcounterClientFiles/tree/2.x) contains Web Components V1, Polymer 2, Bootstrap. It was the source of the client-side libraries bundled with Starcounter 2.4 (from 2.4.0.4448 to 2.4.0.5099).

The branch [`3.x`](https://github.com/Starcounter/StarcounterClientFiles/tree/3.x) contains Web Components V1, Polymer 2, Uniform.css, Underwear.css. It is the source of the client-side libraries bundled with Starcounter 2.4 (from 2.4.0.5100).

## Included Libraries

Please see [`src/StarcounterClientFiles/bower-list.txt`](src/StarcounterClientFiles/bower-list.txt) for a list of currently installed libraries.

## Releasing a new version

As you may know, Starcounter Level1 pulls this app as a Nuget package as a source for Client Files. But level1 is locked to a certain version of this app. This configuration in level can be found in [this file](https://github.com/Starcounter/level1/blob/a706fcc9d41725bb528c86b6e5fc0053f5aca467/src/BuildSystem/ClientFiles/ClientFiles.csproj). If you release a version and want it to be pulled by level1, you must bump [this line](https://github.com/Starcounter/level1/blob/a706fcc9d41725bb528c86b6e5fc0053f5aca467/src/BuildSystem/ClientFiles/ClientFiles.csproj#L9). Please make sure to bump level1 only after you release SCF to avoid broken level1 builds.

You may use wildcards (eg `3.*`), in which case the SCF package will be pulled immediately after it's released (assuming it matches the wildcard) and it will be bundled within the next release of Starcounter. Kindly release with care.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).
