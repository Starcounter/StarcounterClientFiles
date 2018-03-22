///
/// Global configuration
///
string clientFilesRootPath = Environment.GetEnvironmentVariable("CakeClientFilesPath");
if (string.IsNullOrEmpty(clientFilesRootPath))
{
    clientFilesRootPath = MakeAbsolute(Directory("..")).FullPath;
    Information("StarcounterClientFiles root full path: {0}", clientFilesRootPath);
}

///
/// Argument parsing 
///
string clientFilesConfiguration = Argument("configuration", "Debug");
string clientFilesMygetApiKey = Argument("mygetApiKey", "");
string clientFilesNuGetPackageFile = Argument("clientFilesNupkgFile", "");
string clientFilesStarNugetPath = Argument("starNugetPath", "");
if (string.IsNullOrEmpty(clientFilesStarNugetPath))
{
    clientFilesStarNugetPath = clientFilesRootPath + "/artifacts";
}

///
/// Task for building ClientFiles
///
Task("BuildClientFiles").Does(() =>
{
    var msBuildSettings = new MSBuildSettings
    {
        Configuration = clientFilesConfiguration,
    };

    MSBuild(clientFilesRootPath + "/StarcounterClientFiles.sln", msBuildSettings);
});

///
/// Task for packaging NuGet ClientFiles package
///     using AssemblyInfo.cs->AssemblyInformationalVersion as NuGet version and starNugetPathArg (%STAR_NUGET%) as output path
///
Task("PackClientFiles").Does(() =>
{
    FileInfo fi = new FileInfo(string.Format("{0}/src/StarcounterClientFiles/Properties/AssemblyInfo.cs", clientFilesRootPath));
    
    if (!fi.Exists)
    {
        throw new Exception(
            string.Format("{0} does not exist which is used to set the NuGet version.", 
                fi.FullName, 
                clientFilesConfiguration));
    }

    string[] readText = System.IO.File.ReadAllLines(fi.FullName);
    string versionInfoLine = readText.Where(t => t.Contains("[assembly: AssemblyInformationalVersion")).FirstOrDefault();

    if (string.IsNullOrEmpty(versionInfoLine))
    {
         throw new Exception(string.Format("{0} does not contain AssemblyInformationalVersion which is used as nuget version.", fi.FullName));
    }

    string version = versionInfoLine.Substring(versionInfoLine.IndexOf('(') + 2, versionInfoLine.LastIndexOf(')') - versionInfoLine.IndexOf('(') - 3);

    var nuGetPackSettings = new NuGetPackSettings 
    {
        Version                 = version,
        NoPackageAnalysis       = true,
        BasePath                = clientFilesRootPath + "/build",
        Properties              = new Dictionary<string, string>()
        {
            {"Configuration", clientFilesConfiguration} 
        },
        OutputDirectory         = clientFilesStarNugetPath
    };
    
    NuGetPack(clientFilesRootPath + "/build/Starcounter.ClientFiles.nuspec", nuGetPackSettings);
});

///
/// Task for pushing ClientFiles to NuGet
///
Task("PushClientFiles").Does(() =>
{
    if (string.IsNullOrEmpty(clientFilesMygetApiKey))
    {
        throw new Exception("MyGet API key has not been set, aborting! Set argument --mygetApiKey");
    }

    FileInfo fi = new FileInfo(clientFilesNuGetPackageFile);
    if (string.IsNullOrEmpty(clientFilesNuGetPackageFile) || !fi.Exists)
    {
        throw new Exception(string.Format("NuGet package file \"{0}\" does not exist, aborting. set argument --nupkgFile", clientFilesNuGetPackageFile));
    }

    var nuGetPushSettings = new NuGetPushSettings {
        Source = "https://www.myget.org/F/starcounter/api/v2/package",
        ApiKey = clientFilesMygetApiKey
    };

    NuGetPush(fi.FullName, nuGetPushSettings);
});