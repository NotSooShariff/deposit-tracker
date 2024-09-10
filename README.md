# Ethereum Deposit Tracker

## Overview

This Ethereum Deposit Tracker monitors and records ETH deposits on the Beacon Deposit Contract (0x00000000219ab540356cBB839Cbe05303d7705Fa). The application integrates Ethereum RPC methods, uses a TypeScript backend, Postgres database with Drizzle ORM, and includes monitoring and alerting with Grafana, Prometheus, and cAdvisor.

### Features:
- **Real-time deposit tracking**: Tracks deposits on the Beacon Deposit Contract.
- **Multiple deposit handling**: Capable of processing multiple deposits within a single transaction.
- **Error handling & logging**: Comprehensive logging for errors and key events.
- **Metrics & Visualization**: Grafana dashboard with Prometheus for deposit tracking metrics.
- **Optional Alerts**: Telegram notifications for detected deposits (optional).

---

## Tech Stack

- **Language**: TypeScript
- **Database**: Postgres with Drizzle ORM
- **Monitoring**: Grafana, Prometheus, cAdvisor
- **Blockchain Interaction**: Ethereum RPC (via Alchemy)
- **Containerization**: Docker 

---

## Project Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (v16.x or higher)
- PostgreSQL
- Docker (optional, for deployment and monitoring tools)
- Grafana, Prometheus, and cAdvisor
