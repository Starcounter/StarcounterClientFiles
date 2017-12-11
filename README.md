# StarcounterClientFiles

An app that provides Starcounter with all the client-side libs it needs to function. Currently it has:

[//]: # (Please execute `bower list` in `src\StarcounterClientFiles\wwwroot` and list the output below)

```shell
starcounter-clientfiles#2.0.0           C:\Work\Starcounter\StarcounterClientFiles\src\StarcounterClientFiles\wwwroot
    ├─┬ bootswatch#3.3.7 (latest is 4.0.0-beta.2)
    │ └── bootstrap not installed
    ├─┬ imported-template#3.0.0
    │ └── juicy-html#3.0.0
    ├── juicy-redirect#0.6.0
    ├─┬ palindrom-client#4.0.3
    │ ├── Palindrom#3.0.9
    │ └─┬ polymer#2.3.1 incompatible with ^1.11.0 (1.11.1 available, latest is 2.3.1)
    │   ├── shadycss#1.1.0
    │   └── webcomponentsjs#1.0.20
    ├── palindrom-redirect#0.7.0
    ├── polymer#2.3.1
    ├── puppet-redirect#0.7.0
    ├─┬ starcounter-include#4.0.0
    │ ├─┬ imported-template#3.0.0
    │ │ └── juicy-html#3.0.0
    │ └── translate-shadowdom#0.0.5
    └── webcomponentsjs#1.0.20
```

## Development

If you edit client-libs, please execute `bower list > bower-list.txt` in `src\StarcounterClientFiles\wwwroot` and copy-paste `bower-list.txt` contents in README.md (above).