@ECHO OFF

PUSHD %~dp0src\StarcounterClientFiles
starpack -p
POPD

PUSHD %~dp0bifrost
pack.bat
POPD