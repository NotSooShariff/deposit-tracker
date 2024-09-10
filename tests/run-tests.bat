@echo off

:: Navigate to the core directory
cd core || exit /b

:: Run Jest tests from the tests/ folder
npx jest tests/
