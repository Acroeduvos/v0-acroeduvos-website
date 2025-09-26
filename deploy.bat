@echo off
REM Acroeduvos Deployment Script for Windows
REM This script deploys the Acroeduvos application using Docker

echo 🚀 Starting Acroeduvos deployment...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed. Please install Docker Desktop first.
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo [WARNING] .env file not found. Creating from .env.example...
    if exist .env.example (
        copy .env.example .env
        echo [WARNING] Please update .env file with your configuration before continuing.
        exit /b 1
    ) else (
        echo [ERROR] .env file not found and no .env.example available.
        exit /b 1
    )
)

REM Create SSL directory if it doesn't exist
if not exist ssl (
    echo [INFO] Creating SSL directory...
    mkdir ssl
)

REM Check if SSL certificates exist
if not exist ssl\cert.pem (
    echo [WARNING] SSL certificates not found in ssl\ directory.
    echo [WARNING] Please add your SSL certificates:
    echo [WARNING]   - ssl\cert.pem (certificate file)
    echo [WARNING]   - ssl\key.pem (private key file)
    echo [WARNING]
    echo [WARNING] For development, you can generate self-signed certificates:
    echo [WARNING]   openssl req -x509 -newkey rsa:4096 -keyout ssl\key.pem -out ssl\cert.pem -days 365 -nodes
    exit /b 1
)

if not exist ssl\key.pem (
    echo [WARNING] SSL certificates not found in ssl\ directory.
    echo [WARNING] Please add your SSL certificates:
    echo [WARNING]   - ssl\cert.pem (certificate file)
    echo [WARNING]   - ssl\key.pem (private key file)
    echo [WARNING]
    echo [WARNING] For development, you can generate self-signed certificates:
    echo [WARNING]   openssl req -x509 -newkey rsa:4096 -keyout ssl\key.pem -out ssl\cert.pem -days 365 -nodes
    exit /b 1
)

REM Stop existing containers
echo [INFO] Stopping existing containers...
docker-compose down

REM Remove old images
echo [INFO] Removing old images...
docker-compose down --rmi all

REM Build and start containers
echo [INFO] Building and starting containers...
docker-compose up --build -d

REM Wait for services to be ready
echo [INFO] Waiting for services to be ready...
timeout /t 10 /nobreak >nul

REM Check if services are running
docker-compose ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo [INFO] ✅ Deployment successful!
    echo [INFO] Application is running at: https://acroeduvos.in
    echo [INFO]
    echo [INFO] To view logs: docker-compose logs -f
    echo [INFO] To stop: docker-compose down
    echo [INFO] To restart: docker-compose restart
) else (
    echo [ERROR] ❌ Deployment failed. Check logs with: docker-compose logs
    exit /b 1
)

pause
