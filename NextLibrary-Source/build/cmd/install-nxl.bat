@echo off

cd "../lib/"

node fetchData.js Nxium-Developments NextLanguage

setlocal

rem Set the path to your zip file
set "zipFile=../../release/downloads/NextLanguage-v1.4.zip"

rem Set the path to the destination folder
set "destinationFolder=../../release/NextLanguage"

rem Set a temporary extraction folder
set "tempFolder=%temp%\temp_extract"

rem Create the temporary folder if it doesn't exist
if not exist "%tempFolder%" mkdir "%tempFolder%"

rem Extract the zip file to the temporary folder
powershell -command "Expand-Archive -Path '%zipFile%' -DestinationPath '%tempFolder%'"

rem Copy the contents of the temporary folder to the destination folder
xcopy "%tempFolder%\*" "%destinationFolder%\" /E /Y

rem Clean up the temporary folder
rd /s /q "%tempFolder%"

echo Extraction and copy completed.

endlocal


pause