@ECHO OFF

SETLOCAL EnableDelayedExpansion

:: Set up the env to use Msbuild
PUSHD %~dp0
IF EXIST "%programfiles(x86)%\Microsoft Visual Studio\2017\Community\Common7\Tools\VsDevCmd.bat" (
    CALL "%programfiles(x86)%\Microsoft Visual Studio\2017\Community\Common7\Tools\VsDevCmd.bat"
) ELSE IF EXIST "%programfiles(x86)%\Microsoft Visual Studio\2017\Enterprise\Common7\Tools\VsDevCmd.bat" (
    CALL "%programfiles(x86)%\Microsoft Visual Studio\2017\Enterprise\Common7\Tools\VsDevCmd.bat"
) ELSE IF EXIST "%programfiles(x86)%\Microsoft Visual Studio\2017\Professional\Common7\Tools\VsDevCmd.bat" (
    CALL "%programfiles(x86)%\Microsoft Visual Studio\2017\Professional\Common7\Tools\VsDevCmd.bat"
) ELSE IF EXIST "%programfiles(x86)%\Microsoft Visual Studio\2017\BuildTools\Common7\Tools\VsDevCmd.bat" (
    CALL "%programfiles(x86)%\Microsoft Visual Studio\2017\BuildTools\Common7\Tools\VsDevCmd.bat"
) ELSE IF EXIST "%VS140COMNTOOLS%\vsvars32.bat" (
    CALL "%VS140COMNTOOLS%\vsvars32.bat"
) ELSE (
    ECHO Error: You don't seem to have Visual Studio 2015 or 2017 installed
)
POPD

PUSHD %~dp0
msbuild /m
POPD

ENDLOCAL