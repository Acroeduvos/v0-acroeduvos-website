# AcroEduvos Network Deployment Script
# Supports IP range: 172.16.20.0 - 172.16.20.255

Write-Host "Starting AcroEduvos Network Deployment..." -ForegroundColor Green
Write-Host ""

# Set environment variables for network access
$env:CUSTOM_HOST = "0.0.0.0"
$env:CUSTOM_PORT = "3000"
$env:NODE_ENV = "production"

Write-Host "Building application for network deployment..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please check the errors above." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Starting server on network..." -ForegroundColor Green
Write-Host "Server will be accessible at:" -ForegroundColor Cyan
Write-Host "- http://localhost:3000" -ForegroundColor White
Write-Host "- http://127.0.0.1:3000" -ForegroundColor White
Write-Host "- http://172.16.20.X:3000 (where X is any IP in range 1-255)" -ForegroundColor White
Write-Host "- http://acroeduvos.in:3000" -ForegroundColor White
Write-Host ""

npm run start:network
