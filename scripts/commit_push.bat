@echo off

:: Navigate to the project root
cd %~dp0\..

:: Prompt for a commit message
set /p commit_message=Enter commit message: 

:: Add changes, commit, and push
git add .
git commit -m "%commit_message%"
git push

:: Confirm success
if %ERRORLEVEL% == 0 (
    echo Changes successfully pushed!
) else (
    echo Failed to push changes.
)
pause
