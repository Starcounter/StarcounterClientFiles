# StarcounterClientFiles

App that overwrites Starcounter's `/sys/` with anything in its `/sys` folder. This branch is upgrade Starcounter to Palindrom 3.0.0 and `palindrom-polymer-client` 4.0.0.

### Purpose of this app

The Starcounter installer includes a bundle of commonly used client-side libraries with set versions. In case you want to try out these libraries in a different version, your options are:

1. Manually replace the files in your installation path (typically `C:\Program Files\Starcounter\ClientFiles\StaticFiles\sys`)

2. Run an app that overwrites the URLs with different versions of libraries bundled with the installer

This app is the implementation of the option 2.

## Testing Palindrom 3.0.0 and `palindrom-polymer-client` 4.0.0 using StarcounterClientFiles

### Steps:

1. Clone this repo.
2. Run this application. 
3. See if your other Starcounter apps work seamlessly without any problems.
4. See if (`puppet-client` is deprecated) warning exists in your browser console.
5. It would be super nice of you to verify the version of `palindrom-client` is 4.0.0, by looking at the downloaded files log from Chrome's Network tab in DevTools. `palindrom-client.html` has a version banner right on top.


Thanks!