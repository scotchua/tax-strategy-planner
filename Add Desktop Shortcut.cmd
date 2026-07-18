@echo off
rem ============================================================================
rem  Creates Desktop and Start Menu shortcuts for the Tax Strategy Planner,
rem  with the app icon. Run once (double-click); safe to run again after
rem  moving the folder - shortcuts are refreshed to the new location.
rem ============================================================================
set "DIR0=%~dp0"
rem Escape any apostrophe in the path (e.g. "C:\Users\O'Brien\...") so it
rem doesn't terminate the single-quoted PowerShell string below early.
set "DIR0=%DIR0:'=''%"
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$dir = '%DIR0%'.TrimEnd('\');" ^
  "$ws = New-Object -ComObject WScript.Shell;" ^
  "foreach ($place in @([Environment]::GetFolderPath('Desktop'), (Join-Path ([Environment]::GetFolderPath('StartMenu')) 'Programs'))) {" ^
  "  $lnk = $ws.CreateShortcut((Join-Path $place 'Tax Strategy Planner.lnk'));" ^
  "  $lnk.TargetPath = (Join-Path $dir 'Launch Tax Strategy Planner.cmd');" ^
  "  $lnk.WorkingDirectory = $dir;" ^
  "  $lnk.IconLocation = (Join-Path $dir 'app.ico') + ',0';" ^
  "  $lnk.Description = 'Tax Strategy Planner';" ^
  "  $lnk.WindowStyle = 7;" ^
  "  $lnk.Save();" ^
  "}" ^
  "Write-Host 'Shortcuts created on the Desktop and Start Menu.'"
pause
