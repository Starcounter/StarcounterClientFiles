@ECHO OFF

PUSHD %~dp0src\StarcounterClientFiles
starpack -p
POPD

PUSHD %~dp0build
pack.bat
POPD