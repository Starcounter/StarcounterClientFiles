$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition

Set-Location $scriptPath

vulcanize --inline-scripts --inline-css --strip-comments --polymer2 --out-request-list urls.txt src\StarcounterClientFiles\wwwroot\sys\starcounter.html > src\StarcounterClientFiles\wwwroot\sys\starcounter.min.html

# vulcanize outputs absolute paths, we need them relative
$WorkingDir = Convert-Path . # get current path
$WorkingDir = $WorkingDir -replace "\\", "/" # make it unix-style
$WorkingDir = $WorkingDir + "/src/StarcounterClientFiles/wwwroot/"; # concat the known rest of the path

# Remove the begining of the absolute path from each line
$Urls = (Get-Content urls.txt) | ForEach-Object { $_ -replace $WorkingDir, "" }

# Turn data into a JS array

# Add quotes to each line
$Urls = $Urls | ForEach-Object { '"' + $_ + '",' } 

# Add square brackets 
$Urls = '[' + ($Urls) + "]"

# Inject the result in service-worker file
((Get-Content service-worker.src.js) -replace "TO_BE_AUTOMATICALLY_REPLACED_WITH_URLS_ARRAY", $Urls) | Set-Content src\StarcounterClientFiles\wwwroot\service-worker.js

# Remove original file
remove-item urls.txt 
