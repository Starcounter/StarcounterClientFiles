:: Push ClientFiles to NuGet
::    usage: push_nuget_package.bat [nupkg file] [NuGet api key]
::           push_nuget_package.bat C:\somefolder\Starcounter.ClientFiles.X.Y.Z.nupkg XXXXXXXXXXXXXXXXXXXXXX

@echo off

if "%1" == "" (
    echo NuGet package needs to be set as the first argument to %0
    goto end
)

if "%2" == "" (
    echo NuGet API key needs to be set as the second argument to %0
    goto end
)

dotnet cake %~dp0build.cake --targets="PushClientFiles" --clientFilesNupkgFile="%1" --nugetApiKey="%2" --verbosity=Normal || exit /b %errorlevel%

:end
exit /b 0