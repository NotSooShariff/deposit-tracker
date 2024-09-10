---
sidebar_position: 3
--- 

# Set Environment Variables

Environment variables are essential for configuring your application and managing sensitive information securely. Follow these steps to set up your environment variables for your Dockerized Grafana setup.

## Steps to Set Environment Variables

1. **Navigate to the `core` Directory**
   
   Change the directory to the `core` which houses all the essential code

   ```
    cd .\core\
   ```

2. **Rename the `.env.sample` File**

   Begin by renaming the `.env.sample` file to `.env`. This file contains sample environment variables and serves as a template for your configuration. You can rename it using the Command Prompt or PowerShell:

   ```cmd
   ren .env.sample .env
   ```

   This command will rename the file so that it can be used for configuration.
   ![rename variables](img/rename-env.png)

3. **Configure the Environment Variables**

   Open the `.env` file in a text editor like Notepad or Visual Studio Code, and set your environment variables. The file should be edited to look like this:

   ```plaintext
   ALCHEMY_API_KEY=your_alchemy_api_key_here
   DATABASE_URL=postgresql://grafana:grafana@localhost:5432/grafana
   BEACON_DEPOSIT_CONTRACT_ADDRESS=0x00000000219ab540356cBB839Cbe05303d7705Fa
   ```

   - `ALCHEMY_API_KEY`: Enter your Alchemy API Key here. This key is necessary for accessing blockchain data.
   - `DATABASE_URL`: This is the connection string for your PostgreSQL database, formatted as `postgresql://username:password@host:port/database`.
   - `BEACON_DEPOSIT_CONTRACT_ADDRESS`: Specify the address of the Beacon Deposit Contract you want to monitor. This is the smart contract address on the Ethereum blockchain.

4. **Adjust the Database Connection (if needed)**

   If you are using an external PostgreSQL database or if your database credentials differ, update the `DATABASE_URL` variable accordingly. For example, to connect to a remote database, replace `localhost` with the remote server address and ensure that the port, username, and password are correct.

   Example of a modified `DATABASE_URL` for an external PostgreSQL database:

   ```plaintext
   DATABASE_URL=postgresql://username:password@remote_host:5432/remote_database
   ```

   Ensure that the remote database is accessible from your Docker container or local environment and that the credentials are accurate.

5. **Save and Secure the `.env` File**

   After updating the `.env` file, save your changes. Make sure to keep this file secure and avoid exposing it in public repositories or logs, as it contains sensitive information like API keys and database credentials. This has already been added to the `.gitignore`

