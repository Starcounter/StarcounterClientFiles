# SysUpgrade

App that upgrades Starcounter's `/sys/` dependencies to Polymer 1.3

## Purpose of this app

The Starcounter installer includes a bundle of commonly used client-side libraries with set versions. In case you want to try out these libraries in a different version, your options are:

a. Manually replace the files in your installation path (typically `C:\Program Files\Starcounter\ClientFiles\StaticFiles\sys`)
b. Run an app that overwrites the URLs with different versions of libraries bundled with the installer

This app is the implementation of the option b.

## Usage instructions

Clone this repo locally and build the project in Visual Studio. 

Then start the app using Visual Studio or `cmd`:

```
cd c:\github\starcountersamples\sysupgrade\sysupgrade
star bin\debug\sysupgrade.exe
```
