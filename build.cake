///
/// Private namespace
///
{
    ///
    /// Root path configuration
    ///
    DirectoryPath rootDirectory = Context.GetCallerInfo().SourceFilePath.GetDirectory();
    string rootPath = rootDirectory.FullPath;

    ///
    /// Argument parsing
    ///
    string configuration = Argument("configuration", "Debug");
    string nugetApiKey = Argument("nugetApiKey", "");
    string nuGetPackageFile = Argument("clientFilesNupkgFile", "");
    string starNugetPath = Argument("starNugetPath", "");
    if (string.IsNullOrEmpty(starNugetPath))
    {
        starNugetPath = EnvironmentVariable("STAR_NUGET") ?? $"{rootPath}/artifacts";
    }

    ///
    /// Task for building ClientFiles
    ///
    Task("BuildClientFiles").Does(() =>
    {
        var msBuildSettings = new MSBuildSettings
        {
            Configuration = configuration,
        };

        MSBuild(rootPath + "/StarcounterClientFiles.sln", msBuildSettings);
    });

    ///
    /// Task for packaging NuGet ClientFiles package
    ///     using AssemblyInfo.cs->AssemblyInformationalVersion as NuGet version and starNugetPathArg (%STAR_NUGET%) as output path
    ///
    Task("PackClientFiles").Does(() =>
    {
        FileInfo fi = new FileInfo(string.Format("{0}/src/StarcounterClientFiles/Properties/AssemblyInfo.cs", rootPath));

        if (!fi.Exists)
        {
            throw new Exception(
                string.Format("{0} does not exist which is used to set the NuGet version.",
                    fi.FullName,
                    configuration));
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
            BasePath                = rootPath + "/nuget",
            Properties              = new Dictionary<string, string>()
            {
                { "Configuration", configuration }
            },
            OutputDirectory         = starNugetPath
        };

        NuGetPack(rootPath + "/nuget/Starcounter.ClientFiles.nuspec", nuGetPackSettings);
    });

    ///
    /// Task for pushing ClientFiles to NuGet
    ///
    Task("PushClientFiles").Does(() =>
    {
        if (string.IsNullOrEmpty(nugetApiKey))
        {
            throw new Exception("NuGet API key has not been set, aborting! Set argument --nugetApiKey");
        }

        FileInfo fi = new FileInfo(nuGetPackageFile);
        if (string.IsNullOrEmpty(nuGetPackageFile) || !fi.Exists)
        {
            throw new Exception(string.Format("NuGet package file \"{0}\" does not exist, aborting. set argument --nupkgFile", nuGetPackageFile));
        }

        var nuGetPushSettings = new NuGetPushSettings
        {
            Source = "https://api.nuget.org/v3/index.json",
            ApiKey = nugetApiKey
        };

        NuGetPush(fi.FullName, nuGetPushSettings);
    });

    ///
    /// Run targets if invoked as self-containment script
    ///
    if (!Tasks.Any(t => t.Name.Equals("Bifrost")))
    {
        // Read targets argument
        IEnumerable<string> targetsArg = Argument("targets", "Build,Pack").Split(new Char[]{',', ' '}).Where(s => !string.IsNullOrEmpty(s));

        // Self-containment dependent targets
        Task("Build").IsDependentOn("BuildClientFiles");
        Task("Pack").IsDependentOn("PackClientFiles");
        Task("Push").IsDependentOn("PushClientFiles");

        // Run target
        foreach (string t in targetsArg)
        {
            RunTarget(t);
        }
    }
}