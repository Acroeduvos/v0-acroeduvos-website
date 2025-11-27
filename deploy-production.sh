#!/bin/bash

# AcroEduvos Production Deployment Script
echo "🚀 Starting AcroEduvos Production Deployment..."

# Set production environment
export NODE_ENV=production
export NEXT_PUBLIC_APP_URL=https://acroeduvos.in
export NEXT_PUBLIC_API_URL=https://acroeduvos.in/api
export NEXT_PUBLIC_SUPPORT_EMAIL=support@acroeduvos.in
export CUSTOM_HOST=0.0.0.0
export CUSTOM_PORT=3000

echo "📦 Installing dependencies..."
npm ci --production

echo "🔨 Building production application..."
npm run build

echo "🧹 Cleaning up development files..."
rm -rf .next/cache
rm -rf node_modules/.cache

echo "📊 Checking build size..."
du -sh .next/standalone

echo "🌐 Starting production server..."
echo "Application will be available at:"
echo "  - http://localhost:3000"
echo "  - http://172.16.20.X:3000 (network access)"
echo "  - https://acroeduvos.in:3000"

# Start the production server
npm run start

echo "✅ AcroEduvos Production Deployment Complete!"
