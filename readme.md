# BlogSite Application

## Overview

This project is a multi-service application that includes user management, blog services, and an API gateway. It uses Docker to containerize the services and Kafka for messaging.

## Services

- **User Service**: Manages user-related operations.
- **Command Service**: Handles blog creation and updates.
- **Query Service**: Handles blog queries and reads.
- **API Gateway**: Routes requests to the appropriate service.
- **Kafka**: Provides messaging infrastructure.
- **Zookeeper**: Manages Kafka brokers.

## Prerequisites

- Docker and Docker Compose installed on your machine.

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. **Run the Application**
 
   ```bash
   docker-compose up --build

3. **To do End-to-End API Testing

   ```bash
   npx cypress open

