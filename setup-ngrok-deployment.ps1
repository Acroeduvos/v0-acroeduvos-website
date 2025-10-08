# AcroEduvos Ngrok Deployment Setup Script
# This script helps connect your local app to acroeduvos.in via ngrok

Write-Host "🚀 AcroEduvos Deployment Setup via Ngrok" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# Check if ngrok is installed
$ngrokPath = "D:\ngrok\ngrok.exe"
if (!(Test-Path $ngrokPath)) {
    Write-Host "❌ Ngrok not found at $ngrokPath" -ForegroundColor Red
    Write-Host "Please ensure ngrok is installed in D:\ngrok\" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Ngrok found at $ngrokPath" -ForegroundColor Green

# Check if Next.js server is running
$port3000 = netstat -an | findstr ":3000"
if (!$port3000) {
    Write-Host "❌ Next.js server not running on port 3000" -ForegroundColor Red
    Write-Host "Please start your Next.js app first:" -ForegroundColor Yellow
    Write-Host "  cd C:\Users\Lenovo\OneDrive\Documents\AcroEduvos" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Next.js server running on port 3000" -ForegroundColor Green

# Check ngrok authentication
Write-Host "`n🔐 Checking ngrok authentication..." -ForegroundColor Yellow
$authCheck = & $ngrokPath config check 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ngrok authentication required!" -ForegroundColor Red
    Write-Host "`n📝 Please follow these steps:" -ForegroundColor Yellow
    Write-Host "1. Visit: https://dashboard.ngrok.com/signup" -ForegroundColor Cyan
    Write-Host "2. Create a free account" -ForegroundColor Cyan
    Write-Host "3. Get your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor Cyan
    Write-Host "4. Run: $ngrokPath authtoken YOUR_AUTHTOKEN_HERE" -ForegroundColor Cyan
    Write-Host "5. Run this script again" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Ngrok authentication configured" -ForegroundColor Green

# Create tunnel
Write-Host "`n🌐 Creating ngrok tunnel..." -ForegroundColor Yellow
Write-Host "Starting tunnel in background..." -ForegroundColor Cyan

# Start ngrok in background
$ngrokJob = Start-Job -ScriptBlock {
    param($ngrokPath)
    & $ngrokPath http 3000 --log stdout
} -ArgumentList $ngrokPath

Write-Host "⏳ Waiting for tunnel to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Get tunnel URL
try {
    $response = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -Method Get
    $publicUrl = $response.tunnels[0].public_url
    
    Write-Host "`n🎉 Tunnel created successfully!" -ForegroundColor Green
    Write-Host "📱 Public URL: $publicUrl" -ForegroundColor Cyan
    Write-Host "🌍 Local URL: http://localhost:3000" -ForegroundColor Cyan
    
    Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Test your app at: $publicUrl" -ForegroundColor Cyan
    Write-Host "2. Configure DNS for acroeduvos.in:" -ForegroundColor Cyan
    Write-Host "   • Add CNAME record: acroeduvos.in → $($publicUrl.Replace('https://', ''))" -ForegroundColor White
    Write-Host "   • Or use domain forwarding service" -ForegroundColor White
    
    Write-Host "`n🔧 Managing the tunnel:" -ForegroundColor Yellow
    Write-Host "• Stop tunnel: Stop-Job $($ngrokJob.Id)" -ForegroundColor Cyan
    Write-Host "• View dashboard: http://localhost:4040" -ForegroundColor Cyan
    
    # Keep script running to maintain tunnel
    Write-Host "`n⏳ Tunnel is running... Press Ctrl+C to stop" -ForegroundColor Green
    Write-Host "Your app will be accessible at: $publicUrl" -ForegroundColor Cyan
    
    # Wait for user interrupt
    while ($true) {
        Start-Sleep -Seconds 10
        # Check if tunnel is still alive
        try {
            $statusCheck = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -Method Get -TimeoutSec 5
            if ($statusCheck.tunnels.Count -eq 0) {
                Write-Host "❌ Tunnel connection lost. Retrying..." -ForegroundColor Red
                Start-Job -ScriptBlock { & $using:ngrokPath http 3000 } -ArgumentList $ngrokPath
                Start-Sleep -Seconds 3
            }
        } catch {
            Write-Host "⚠️  Tunnel status check failed: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
    
} catch {
    Write-Host "❌ Failed to get tunnel URL: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure ngrok is running properly" -ForegroundColor Yellow
}

# Cleanup on exit
Register-EngineEvent PowerShell.Exiting -Action {
    Write-Host "`n🛑 Stopping ngrok tunnel..." -ForegroundColor Yellow
    Get-Job | Where-Object {$_.Command -like "*ngrok*"} | Stop-Job
    Get-Job | Where-Object {$_.Command -like "*ngrok*"} | Remove-Job
}
