# 🚀 Production Deployment Guide for acroeduvos.in

## Prerequisites

1. **VPS/Cloud Server** (Recommended: DigitalOcean, AWS, Vultr, Linode)
   - Minimum: 2GB RAM, 1 CPU, 25GB SSD
   - Ubuntu 20.04+ or CentOS 8+

2. **Domain Configuration**
   - Domain: `acroeduvos.in`
   - Point A record to your server IP

## Step 1: Server Setup

### Connect to your server:
```bash
ssh root@your-server-ip
```

### Update system:
```bash
apt update && apt upgrade -y
```

### Install Docker:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker
```

### Install Docker Compose:
```bash
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## Step 2: Clone Repository

```bash
git clone https://github.com/Acroeduvos/v0-acroeduvos-website.git
cd v0-acroeduvos-website
```

## Step 3: Environment Configuration

```bash
cp env.example .env
nano .env
```

Update the following variables:
```env
NEXT_PUBLIC_APP_URL=https://acroeduvos.in
NEXT_PUBLIC_APP_NAME=Acroeduvos
NEXT_PUBLIC_APP_DESCRIPTION=Competitive Programming Platform
JUDGE0_API_KEY=your_judge0_api_key_here
```

## Step 4: SSL Certificate Setup

### Option A: Let's Encrypt (Recommended)
```bash
chmod +x setup-ssl.sh
./setup-ssl.sh
```

### Option B: Self-signed (Development)
```bash
chmod +x generate-ssl.ps1
./generate-ssl.ps1
```

## Step 5: Deploy Application

```bash
chmod +x deploy.sh
./deploy.sh
```

## Step 6: Configure Nginx

The nginx configuration is already included in `nginx.conf` and will be automatically applied.

## Step 7: Domain Configuration

### Update DNS Records:
- A Record: `acroeduvos.in` → `your-server-ip`
- A Record: `www.acroeduvos.in` → `your-server-ip`

### Test Domain:
```bash
curl -I https://acroeduvos.in
```

## Step 8: Firewall Configuration

```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

## Monitoring and Maintenance

### Check application status:
```bash
docker-compose ps
docker-compose logs -f
```

### Update application:
```bash
git pull
docker-compose down
docker-compose up -d --build
```

### Backup:
```bash
docker-compose exec app tar -czf /tmp/backup.tar.gz /app
```

## Troubleshooting

### Common Issues:

1. **Port 80/443 already in use:**
   ```bash
   sudo netstat -tlnp | grep :80
   sudo systemctl stop apache2  # or nginx
   ```

2. **SSL certificate issues:**
   ```bash
   docker-compose logs nginx
   ```

3. **Application not starting:**
   ```bash
   docker-compose logs app
   ```

## Performance Optimization

### Enable gzip compression:
Already configured in nginx.conf

### Set up monitoring:
```bash
# Install monitoring tools
apt install htop iotop nethogs
```

## Security Checklist

- ✅ Firewall configured
- ✅ SSL certificate installed
- ✅ Regular updates enabled
- ✅ Docker containers running
- ✅ Nginx security headers
- ✅ Rate limiting enabled

## Support

For issues or questions:
1. Check logs: `docker-compose logs`
2. Verify configuration: `docker-compose config`
3. Restart services: `docker-compose restart`

---

**🎉 Your Acroeduvos platform will be live at https://acroeduvos.in**
