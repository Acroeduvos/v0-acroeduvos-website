# Self-Hosting Acroeduvos

This guide will help you deploy Acroeduvos on your own server using Docker.

## Prerequisites

- Docker and Docker Compose installed
- Domain name pointing to your server
- SSL certificates (Let's Encrypt recommended)
- Server with at least 2GB RAM and 20GB storage

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Acroeduvos/v0-acroeduvos-website.git
cd v0-acroeduvos-website
```

### 2. Set Up Environment Variables

```bash
cp env.example .env
```

Edit `.env` file with your configuration:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=Acroeduvos
NEXT_PUBLIC_APP_DESCRIPTION=Competitive Programming Platform
JUDGE0_API_KEY=your_judge0_api_key_here
```

### 3. Set Up SSL Certificates

#### Option A: Let's Encrypt (Recommended)

```bash
# Install certbot
sudo apt-get install certbot

# Run the SSL setup script
chmod +x setup-ssl.sh
./setup-ssl.sh
```

#### Option B: Self-Signed (Development)

```bash
# Run the SSL setup script
chmod +x setup-ssl.sh
./setup-ssl.sh
```

#### Option C: Use Existing Certificates

Place your certificates in the `ssl/` directory:
- `ssl/cert.pem` - Certificate file
- `ssl/key.pem` - Private key file

### 4. Deploy the Application

#### Linux/macOS:

```bash
chmod +x deploy.sh
./deploy.sh
```

#### Windows:

```cmd
deploy.bat
```

### 5. Verify Deployment

Visit `https://yourdomain.com` to verify the deployment.

## Manual Deployment

If you prefer to deploy manually:

```bash
# Build and start containers
docker-compose up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | Yes |
| `NEXT_PUBLIC_APP_DESCRIPTION` | Application description | Yes |
| `JUDGE0_API_KEY` | Judge0 API key for code execution | Yes |

### Nginx Configuration

The included `nginx.conf` provides:
- SSL termination
- Rate limiting
- Security headers
- Gzip compression
- Static file caching

### Docker Services

- **acroeduvos**: Main Next.js application
- **nginx**: Reverse proxy and SSL termination

## Maintenance

### Updating the Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up --build -d
```

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f acroeduvos
docker-compose logs -f nginx
```

### Stopping the Application

```bash
docker-compose down
```

### Backup

```bash
# Backup SSL certificates
tar -czf ssl-backup.tar.gz ssl/

# Backup environment
cp .env .env.backup
```

## Troubleshooting

### Common Issues

1. **Port 80/443 already in use**
   ```bash
   # Check what's using the ports
   sudo netstat -tulpn | grep :80
   sudo netstat -tulpn | grep :443
   
   # Stop conflicting services
   sudo systemctl stop apache2  # or nginx
   ```

2. **SSL certificate errors**
   ```bash
   # Check certificate validity
   openssl x509 -in ssl/cert.pem -text -noout
   
   # Regenerate self-signed certificate
   ./setup-ssl.sh
   ```

3. **Application not starting**
   ```bash
   # Check logs
   docker-compose logs acroeduvos
   
   # Check environment variables
   docker-compose config
   ```

4. **Permission issues**
   ```bash
   # Fix SSL certificate permissions
   chmod 600 ssl/key.pem
   chmod 644 ssl/cert.pem
   ```

### Performance Optimization

1. **Enable HTTP/2**: Already configured in nginx.conf
2. **Enable Gzip**: Already configured in nginx.conf
3. **Set up CDN**: Consider using Cloudflare or similar
4. **Database**: Add PostgreSQL for user data persistence
5. **Caching**: Add Redis for session storage

## Security Considerations

1. **Keep Docker updated**: Regularly update Docker and images
2. **Monitor logs**: Set up log monitoring and alerting
3. **Backup regularly**: Automate SSL certificate and data backups
4. **Firewall**: Configure firewall to only allow necessary ports
5. **SSL renewal**: Set up automatic SSL certificate renewal

## Scaling

For high traffic, consider:

1. **Load balancer**: Use multiple application instances
2. **Database**: Add PostgreSQL for data persistence
3. **Caching**: Add Redis for session and data caching
4. **CDN**: Use Cloudflare or similar for static assets
5. **Monitoring**: Add monitoring and alerting systems

## Support

For issues and questions:
- Check the logs: `docker-compose logs -f`
- Review this documentation
- Check GitHub issues
- Contact support

## License

This project is licensed under the MIT License.
