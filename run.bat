@ECHO OFF

IF "%CONFIGURATION%"=="" SET CONFIGURATION=Debug

star --resourcedir="%~dp0src\StarcounterClientFiles\wwwroot" "%~dp0src/StarcounterClientFiles/bin/%CONFIGURATION%/StarcounterClientFiles.exe"