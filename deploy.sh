#!/bin/bash

# Acroeduvos Deployment Script
# This script deploys the Acroeduvos application using Docker

set -e

echo "🚀 Starting Acroeduvos deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_warning "Please update .env file with your configuration before continuing."
        exit 1
    else
        print_error ".env file not found and no .env.example available."
        exit 1
    fi
fi

# Create SSL directory if it doesn't exist
if [ ! -d ssl ]; then
    print_status "Creating SSL directory..."
    mkdir -p ssl
fi

# Check if SSL certificates exist
if [ ! -f ssl/cert.pem ] || [ ! -f ssl/key.pem ]; then
    print_warning "SSL certificates not found in ssl/ directory."
    print_warning "Please add your SSL certificates:"
    print_warning "  - ssl/cert.pem (certificate file)"
    print_warning "  - ssl/key.pem (private key file)"
    print_warning ""
    print_warning "For development, you can generate self-signed certificates:"
    print_warning "  openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes"
    exit 1
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down

# Remove old images
print_status "Removing old images..."
docker-compose down --rmi all

# Build and start containers
print_status "Building and starting containers..."
docker-compose up --build -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    print_status "✅ Deployment successful!"
    print_status "Application is running at: https://acroeduvos.in"
    print_status ""
    print_status "To view logs: docker-compose logs -f"
    print_status "To stop: docker-compose down"
    print_status "To restart: docker-compose restart"
else
    print_error "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi
