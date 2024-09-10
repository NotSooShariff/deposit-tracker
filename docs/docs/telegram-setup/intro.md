---
sidebar_position: 1
---

# Telegram Alerts

This project offers two types of alerts that can be sent directly to Telegram via a bot. Both require two secret values for configuration:

- **API Token**: The token for your Telegram bot.
- **Chat ID**: The chat ID where messages will be pushed.

You can get these by visiting the chat with @GodFather on Telegram.
![alt text](img/tele-botfather-chat.jpg)

## 1. Deposit Alerts via Grafana Dashboard

The first type of alert tracks deposit events and sends notifications directly through the Grafana dashboard. This is useful for monitoring deposit activities in real-time. Once the Grafana dashboard is set up, you can integrate these alerts to notify your Telegram channel of any important events related to Ethereum deposits.
![alt text](img/tele-testfire.jpg)

## 2. Repository Update Alerts via GitHub Workflows

The second type of alert is set up via GitHub workflows. It notifies you when any changes are made to the main repository. This is especially useful for users running this project as an internal tool, where the project is hosted on your own servers for continuous tracking.

![alt text](img/tele-repo.png)
If you fork the repository for 24/7 monitoring, you'll want to stay updated on any new changes or features added to the main repository. The GitHub workflow is configured to push a Telegram notification whenever there’s an update, ensuring you’re always aware when it's time to sync the latest changes from upstream.

This setup ensures that whether you're tracking deposits or keeping your instance updated, you’ll always be notified promptly via Telegram.