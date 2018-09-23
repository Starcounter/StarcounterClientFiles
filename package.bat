@ECHO OFF

PUSHD %~dp0src\StarcounterClientFiles
starpack -p
POPD

dotnet cake %~dp0build.cake --targets="PackClientFiles" --configuration="Debug" --verbosity=Normal

exit /b %errorlevel%