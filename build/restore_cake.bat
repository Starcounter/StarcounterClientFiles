:: Restores Cake NuGet package
::     usage: restore_cake.bat

nuget.exe install %~dp0packages.config -ExcludeVersion -OutputDirectory %~dp0tools

@echo off
exit /b %errorlevel%