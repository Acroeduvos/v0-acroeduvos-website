#!/bin/bash

# SSL Certificate Setup Script for Acroeduvos
# This script helps you set up SSL certificates for your domain

set -e

echo "🔐 Setting up SSL certificates for Acroeduvos..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Create SSL directory
mkdir -p ssl

echo "Choose your SSL certificate option:"
echo "1. Let's Encrypt (Recommended for production)"
echo "2. Self-signed certificate (For development/testing)"
echo "3. Use existing certificates"
echo "4. Exit"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        print_info "Setting up Let's Encrypt SSL certificates..."
        
        # Check if certbot is installed
        if ! command -v certbot &> /dev/null; then
            print_error "Certbot is not installed. Please install certbot first."
            print_info "Installation instructions:"
            print_info "  Ubuntu/Debian: sudo apt-get install certbot"
            print_info "  CentOS/RHEL: sudo yum install certbot"
            print_info "  macOS: brew install certbot"
            exit 1
        fi
        
        read -p "Enter your domain name (e.g., acroeduvos.in): " domain
        read -p "Enter your email address: " email
        
        print_status "Obtaining SSL certificate for $domain..."
        
        # Stop nginx if running
        sudo systemctl stop nginx 2>/dev/null || true
        
        # Obtain certificate
        sudo certbot certonly --standalone -d $domain -d www.$domain --email $email --agree-tos --non-interactive
        
        # Copy certificates to ssl directory
        sudo cp /etc/letsencrypt/live/$domain/fullchain.pem ssl/cert.pem
        sudo cp /etc/letsencrypt/live/$domain/privkey.pem ssl/key.pem
        sudo chown $USER:$USER ssl/cert.pem ssl/key.pem
        
        print_status "✅ Let's Encrypt certificates installed successfully!"
        print_warning "Remember to set up automatic renewal:"
        print_warning "  sudo crontab -e"
        print_warning "  Add: 0 12 * * * /usr/bin/certbot renew --quiet"
        ;;
        
    2)
        print_info "Generating self-signed SSL certificate..."
        
        read -p "Enter your domain name (e.g., acroeduvos.in): " domain
        
        # Generate private key
        openssl genrsa -out ssl/key.pem 2048
        
        # Generate certificate
        openssl req -new -x509 -key ssl/key.pem -out ssl/cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=$domain"
        
        print_status "✅ Self-signed certificate generated successfully!"
        print_warning "Note: Self-signed certificates will show security warnings in browsers."
        print_warning "This is only suitable for development/testing purposes."
        ;;
        
    3)
        print_info "Using existing certificates..."
        
        read -p "Enter path to your certificate file: " cert_path
        read -p "Enter path to your private key file: " key_path
        
        if [ ! -f "$cert_path" ]; then
            print_error "Certificate file not found: $cert_path"
            exit 1
        fi
        
        if [ ! -f "$key_path" ]; then
            print_error "Private key file not found: $key_path"
            exit 1
        fi
        
        # Copy certificates
        cp "$cert_path" ssl/cert.pem
        cp "$key_path" ssl/key.pem
        
        print_status "✅ Certificates copied successfully!"
        ;;
        
    4)
        print_info "Exiting..."
        exit 0
        ;;
        
    *)
        print_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

# Set proper permissions
chmod 600 ssl/key.pem
chmod 644 ssl/cert.pem

print_status "SSL certificates are ready in the ssl/ directory!"
print_info "You can now run the deployment script: ./deploy.sh"
