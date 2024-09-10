#!/bin/bash

# Check if .env file exists
if [ ! -f "core/.env" ]; then
    echo "The .env file is missing in the core directory."
    echo "Please rename .env.sample to .env and fill in the Alchemy API key."
    exit 1
fi

# Update package list and install Docker and Docker Compose
echo "Installing Docker and Docker Compose..."
sudo apt update
sudo apt install -y docker.io docker-compose

# Create Docker network
echo "Creating Docker network 'grafana-net'..."
sudo docker network create grafana-net

# Navigate to core/views and start Docker Compose
echo "Navigating to core/views and starting Docker Compose..."
cd core/views || { echo "Failed to change directory to core/views"; exit 1; }
sudo docker compose up -d

# Navigate back to core and start Docker Compose
echo "Navigating back to core and starting Docker Compose..."
cd ../ || { echo "Failed to change directory to core"; exit 1; }
sudo docker compose up -d

echo "Script completed successfully."
