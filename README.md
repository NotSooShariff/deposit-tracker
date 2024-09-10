# Ethereum Deposit Tracker

## Overview

This Ethereum Deposit Tracker monitors and records ETH deposits on the Beacon Deposit Contract (0x00000000219ab540356cBB839Cbe05303d7705Fa). The application integrates Ethereum RPC methods, uses a TypeScript backend, Postgres database with Drizzle ORM, and includes monitoring and alerting with Grafana, Prometheus, and cAdvisor.

Why Pick This Project?

1. **Deliverables on Steroids**  
   Not only did I tick off all the required tasks and bonus sections (hello, Docker), but I also threw in a fully loaded Docusaurus documentation site, set up Telegram notifications for repo push events, and even deployed it to a real server—because why stop at just *good enough*?

2. **A Tech Stack Built to Impress**  
   With Grafana, cAdvisor, and Prometheus holding down the fort, this project is ready for the big leagues. It’s tailor-made for monitoring blockchain infrastructure (Ethereum, I see you), ensuring everything is running smoothly in real time. It's the kind of stack that whispers "enterprise-approved" without even trying.

3. **Corporate-Level Code—Or So I Hope**  
   Written entirely in TypeScript (because who doesn’t love type safety?), the code comes packed with a custom logger and error handling that would make any CTO nod approvingly. Let’s just say, I’m aiming for *clean, professional*, with a side of "hey, this could actually run in production."

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
