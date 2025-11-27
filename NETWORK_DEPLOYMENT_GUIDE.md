# AcroEduvos Network Deployment Guide

## Overview
This guide covers deploying AcroEduvos on acroeduvos.in with network access for IP range 172.16.20.0 to 172.16.20.255.

## Network Configuration

### Supported IP Ranges
- **Localhost**: 127.0.0.1, localhost
- **Network Range**: 172.16.20.0/24 (172.16.20.1 - 172.16.20.255)
- **Domain**: acroeduvos.in, www.acroeduvos.in

### Port Configuration
- **Default Port**: 3000
- **Host Binding**: 0.0.0.0 (allows external access)

## Deployment Methods

### Method 1: Using Batch Script (Windows)
```bash
# Run the deployment script
deploy-network.bat
```

### Method 2: Using PowerShell Script (Windows)
```powershell
# Run the deployment script
.\deploy-network.ps1
```

### Method 3: Manual Deployment
```bash
# Set environment variables
set CUSTOM_HOST=0.0.0.0
set CUSTOM_PORT=3000
set NODE_ENV=production

# Build the application
npm run build

# Start with network access
npm run start:network
```

### Method 4: Development Mode with Network Access
```bash
# Start development server with network access
npm run dev:network
```

## Access URLs

Once deployed, the application will be accessible at:

### Local Access
- http://localhost:3000
- http://127.0.0.1:3000

### Network Access (172.16.20.x range)
- http://172.16.20.1:3000
- http://172.16.20.2:3000
- ... (any IP from 172.16.20.1 to 172.16.20.255)
- http://172.16.20.255:3000

### Domain Access
- http://acroeduvos.in:3000
- https://acroeduvos.in:3000 (if SSL configured)

## Dynamic Features

### Real-time Updates
- Live user statistics
- Real-time activity feeds
- Dynamic content updates every 5 seconds
- Live coding sessions

### Dynamic Pages
- All pages are server-side rendered (SSR)
- Client-side hydration for interactivity
- Automatic revalidation every 60 seconds
- Fallback support for all routes

### Network Features
- CORS enabled for cross-origin requests
- IP-based access control
- Network status monitoring
- Real-time network statistics

## API Endpoints

### Network Status
```
GET /api/network?action=status
```
Returns network status, client IP, and live features status.

### Network Configuration
```
GET /api/network?action=config
```
Returns network configuration and allowed IP ranges.

## Security Features

### Access Control
- IP range validation (172.16.20.0/24)
- Domain validation (acroeduvos.in)
- CORS headers for secure cross-origin requests

### Headers
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

## Troubleshooting

### Common Issues

1. **Cannot access from network IPs**
   - Ensure firewall allows port 3000
   - Verify IP is in range 172.16.20.x
   - Check if server is binding to 0.0.0.0

2. **CORS errors**
   - Verify middleware.ts is properly configured
   - Check network.config.js settings
   - Ensure headers are set correctly

3. **Build failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review TypeScript configuration

### Network Testing

Test network access:
```bash
# Test localhost
curl http://localhost:3000/api/network?action=status

# Test network IP (replace with your IP)
curl http://172.16.20.1:3000/api/network?action=status

# Test domain
curl http://acroeduvos.in:3000/api/network?action=status
```

## Production Deployment

### Environment Variables
```bash
NODE_ENV=production
CUSTOM_HOST=0.0.0.0
CUSTOM_PORT=3000
```

### Performance Optimization
- Static generation for static pages
- Dynamic imports for heavy components
- Image optimization enabled
- Caching headers configured

### Monitoring
- Real-time statistics dashboard
- Network status monitoring
- Error logging and reporting
- Performance metrics

## Support

For issues or questions:
1. Check the network status API endpoint
2. Review the middleware configuration
3. Verify IP range settings
4. Check firewall and network settings

## Version Information
- **Platform**: Next.js 14.2.16
- **Network Support**: IP Range 172.16.20.0/24
- **Domain**: acroeduvos.in
- **Last Updated**: Dynamic deployment ready
