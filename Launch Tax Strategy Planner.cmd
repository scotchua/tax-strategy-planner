@echo off
rem ============================================================================
rem  Tax Strategy Planner - desktop app launcher
rem  Opens the app in a standalone window (Edge/Chrome app mode: no tabs, no
rem  address bar, its own taskbar entry). Works from any folder location, so
rem  it travels with the app when shared with another firm. Nothing to install.
rem ============================================================================
setlocal
set "DIR=%~dp0"
set "URL=file:///%DIR:\=/%index.html"
rem Folder paths with spaces (e.g. "C:\Users\Jane Smith\Desktop\...") produce
rem an invalid file:// URL unless spaces are percent-encoded.
set "URL=%URL: =%%20%"

set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE%" (
  start "" "%EDGE%" --app="%URL%"
  exit /b
)

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" (
  start "" "%CHROME%" --app="%URL%"
  exit /b
)

rem Fallback: default browser (normal window)
start "" "%URL%"
