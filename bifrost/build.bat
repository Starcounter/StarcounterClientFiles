:: Build ClientFiles
::    usage: build.bat

@echo off

call %~dp0/restore_cake.bat || goto error

set executeCommand=%~dp0tools/Cake/Cake.exe %~dp0build.cake --targets="BuildClientFiles" --configuration="Debug" --verbosity=Normal
echo Executing: %executeCommand%
%executeCommand% || goto error

exit /b 0

:error
echo.
echo Exit with code %errorlevel%
echo.
exit /b %errorlevel%