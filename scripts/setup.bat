@echo off
setlocal

:: Check if .env file exists
if not exist "core\.env" (
    echo The .env file is missing in the core directory.
    echo Please rename .env.sample to .env and fill in the Alchemy API key.
    exit /b 1
)

:: Install Docker and Docker Compose
echo Installing Docker and Docker Compose...

:: Install Docker
powershell -Command "Start-Process powershell -ArgumentList 'iwr -useb https://get.docker.com/ | iex' -Verb RunAs"

:: Wait for Docker to be installed
timeout /t 30

:: Install Docker Compose
powershell -Command "Start-Process powershell -ArgumentList 'Invoke-WebRequest -Uri https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-Windows-x86_64.exe -OutFile docker-compose.exe; Move-Item docker-compose.exe C:\Program Files\Docker\Docker\resources\bin\' -Verb RunAs"

:: Create Docker network
echo Creating Docker network 'grafana-net'...
docker network create grafana-net

:: Navigate to core\views and start Docker Compose
echo Navigating to core\views and starting Docker Compose...
cd core\views || (echo Failed to change directory to core\views & exit /b 1)
docker compose up -d

:: Navigate back to core and start Docker Compose
echo Navigating back to core and starting Docker Compose...
cd ..\ || (echo Failed to change directory to core & exit /b 1)
docker compose up -d

echo Script completed successfully.
endlocal
