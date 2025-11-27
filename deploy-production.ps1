# AcroEduvos Production Deployment Script
Write-Host "🚀 Starting AcroEduvos Production Deployment..." -ForegroundColor Green

# Set production environment variables
$env:NODE_ENV = "production"
$env:NEXT_PUBLIC_APP_URL = "https://acroeduvos.in"
$env:NEXT_PUBLIC_API_URL = "https://acroeduvos.in/api"
$env:NEXT_PUBLIC_SUPPORT_EMAIL = "support@acroeduvos.in"
$env:CUSTOM_HOST = "0.0.0.0"
$env:CUSTOM_PORT = "3000"

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci --production

Write-Host "🔨 Building production application..." -ForegroundColor Yellow
npm run build

Write-Host "🧹 Cleaning up development files..." -ForegroundColor Yellow
if (Test-Path ".next\cache") { Remove-Item -Recurse -Force ".next\cache" }
if (Test-Path "node_modules\.cache") { Remove-Item -Recurse -Force "node_modules\.cache" }

Write-Host "📊 Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Application will be available at:" -ForegroundColor Cyan
Write-Host "  - http://localhost:3000" -ForegroundColor White
Write-Host "  - http://172.16.20.X:3000 (network access)" -ForegroundColor White
Write-Host "  - https://acroeduvos.in:3000" -ForegroundColor White
Write-Host ""

Write-Host "🚀 Starting production server..." -ForegroundColor Green

# Start the production server
npm run start

Write-Host "✅ AcroEduvos Production Deployment Complete!" -ForegroundColor Green
