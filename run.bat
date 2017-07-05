@ECHO OFF

IF "%CONFIGURATION%"=="" SET CONFIGURATION=Debug

star --resourcedir="%~dp0src\SysUpgrade\wwwroot" "%~dp0src/SysUpgrade/bin/%CONFIGURATION%/SysUpgrade.exe"