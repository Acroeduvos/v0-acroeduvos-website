#!/bin/bash

# 🚀 Production Deployment Script for acroeduvos.in
# This script deploys the Acroeduvos application to production

set -e

echo "🌐 Starting production deployment for acroeduvos.in..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Update system
print_info "Updating system packages..."
apt update && apt upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    print_info "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl start docker
    systemctl enable docker
    print_status "Docker installed successfully"
else
    print_status "Docker already installed"
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    print_info "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    print_status "Docker Compose installed successfully"
else
    print_status "Docker Compose already installed"
fi

# Install Git if not installed
if ! command -v git &> /dev/null; then
    print_info "Installing Git..."
    apt install git -y
    print_status "Git installed successfully"
else
    print_status "Git already installed"
fi

# Clone repository if not exists
if [ ! -d "v0-acroeduvos-website" ]; then
    print_info "Cloning repository..."
    git clone https://github.com/Acroeduvos/v0-acroeduvos-website.git
    print_status "Repository cloned successfully"
else
    print_info "Repository already exists, updating..."
    cd v0-acroeduvos-website
    git pull
    cd ..
fi

# Navigate to project directory
cd v0-acroeduvos-website

# Create .env file if not exists
if [ ! -f ".env" ]; then
    print_info "Creating .env file..."
    cp env.example .env
    print_warning "Please update .env file with your configuration"
    print_warning "Especially set your JUDGE0_API_KEY"
else
    print_status ".env file already exists"
fi

# Generate SSL certificate if not exists
if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    print_info "Generating SSL certificate..."
    mkdir -p ssl
    
    # Generate self-signed certificate for development
    openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Acroeduvos/CN=acroeduvos.in"
    
    print_status "SSL certificate generated"
    print_warning "For production, consider using Let's Encrypt"
else
    print_status "SSL certificate already exists"
fi

# Build and start containers
print_info "Building and starting containers..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Wait for containers to start
print_info "Waiting for containers to start..."
sleep 30

# Check container status
print_info "Checking container status..."
docker-compose ps

# Configure firewall
print_info "Configuring firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

# Check if application is running
print_info "Checking application status..."
if curl -f -s http://localhost:3000 > /dev/null; then
    print_status "Application is running successfully!"
    print_info "Your application is available at:"
    echo "  • HTTP:  http://acroeduvos.in"
    echo "  • HTTPS: https://acroeduvos.in"
else
    print_error "Application is not responding"
    print_info "Check logs with: docker-compose logs"
fi

# Display useful commands
echo ""
print_info "Useful commands:"
echo "  • View logs: docker-compose logs -f"
echo "  • Restart: docker-compose restart"
echo "  • Stop: docker-compose down"
echo "  • Update: git pull && docker-compose up -d --build"
echo "  • Check status: docker-compose ps"

echo ""
print_status "Deployment completed!"
print_warning "Don't forget to:"
echo "  1. Update DNS records to point to this server"
echo "  2. Configure your JUDGE0_API_KEY in .env"
echo "  3. Set up Let's Encrypt for production SSL"

echo ""
print_info "🎉 Acroeduvos is now live at https://acroeduvos.in"
