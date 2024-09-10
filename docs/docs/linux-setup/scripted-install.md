---
sidebar_position: 1
---

# Scripted Installation

To install and configure the project on a Linux system, follow these steps:

## 1. Edit the `.env` File

Navigate to the `core/` directory and edit the `.env` file with the necessary environment variables. The key values you need to modify include:

- `ALCHEMY_API_KEY`: Your Alchemy API key.
- `DATABASE_URL`: The connection string for your PostgreSQL database.
- `BEACON_DEPOSIT_CONTRACT_ADDRESS`: The Ethereum deposit contract address.

These values should align with your setup, and you can adjust them based on your configuration needs.

## 2. Grant Execute Permissions to the Script

Before running the setup script, ensure that the script has execute permissions. If it doesn't, you can add execute permissions using the following command:

```bash
chmod +x setup.sh
```

This will allow the script to be executed on your system.

## 3. Run the `setup.sh` Script

Once the `.env` file is configured and permissions are granted, you can run the setup script by executing:

```bash
./setup.sh
```

This script automates the installation and configuration process. It will handle:

- Installing necessary dependencies.
- Setting up Docker containers.
- Running database migrations.
- Preparing the core components for tracking deposits.

After the script finishes running, all the core components required for the application will be set up and ready for use.

## 4. Configure the Dashboard

Once the setup is complete, you can proceed to configure the Grafana dashboard or any other visual components as needed. The next steps will guide you on how to set up and monitor your deposit tracking system.

This process ensures a smooth installation and gets your system ready for deposit tracking in just a few steps.