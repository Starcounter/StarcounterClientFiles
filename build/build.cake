///
/// Usage:
///     cake.exe
///     cake.exe build.cake
///     cake.exe build.cake --targets="PackClientFiles"
///     cake.exe build.cake --targets="PackClientFiles" --verbosity=diagnostic
///
/// All of the commands above does the same thing

///
/// Preprocessor Directives
///
#load "ClientFiles.cake"

///
/// Arguments
///
IEnumerable<string> clientFilesTargetsArg = Argument("targets", "PackClientFiles").Split(new Char[]{',', ' '}).Where(s => !string.IsNullOrEmpty(s));

///
/// Run target
///
foreach (string t in clientFilesTargetsArg)
{
    RunTarget(t);
}