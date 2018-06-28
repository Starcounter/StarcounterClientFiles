:: Push ClientFiles to NuGet
::    usage: push_nuget_package.bat [nupkg file] [myget api key]
::           push_nuget_package.bat C:\somefolder\Starcounter.ClientFiles.X.Y.Z.nupkg XXXXXXXXXXXXXXXXXXXXXX

@echo off

if "%1" == "" (
    echo NuGet package needs to be set as the first argument to %0
    goto end
)

if "%2" == "" (
    echo MyGet API key needs to be set as the second argument to %0
    goto end
)

call %~dp0bifrost/restore_cake.bat || goto error

set executeCommand=%~dp0bifrost/tools/Cake/Cake.exe %~dp0bifrost/build.cake --targets="PushClientFiles" --clientFilesNupkgFile="%1" --mygetApiKey="%2" --verbosity=Normal
echo Executing: %executeCommand%
%executeCommand% || goto error

goto end

:error
echo.
echo Exit with code %errorlevel%
echo.
exit /b %errorlevel%

:end
exit /b 0