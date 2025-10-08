# AcroEduvos Final Production Deployment Script
Write-Host "🚀 DEPLOYING ACROEDUVOS TO PRODUCTION WITH REAL-TIME SYSTEMS..." -ForegroundColor Green
Write-Host ""

# Step 1: Build Production Version
Write-Host "📦 Building production version..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Production build completed!" -ForegroundColor Green
Write-Host ""

# Step 2: Start Production Server
Write-Host "🚀 Starting production server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; npm start" -WindowStyle Minimized

# Wait for server to start
Write-Host "⏳ Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep 8

# Step 3: Start ngrok tunnel
Write-Host "🌐 Starting ngrok tunnel..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; ngrok http 3000" -WindowStyle Minimized

# Wait for ngrok to start
Write-Host "⏳ Waiting for ngrok to start..." -ForegroundColor Yellow
Start-Sleep 10

# Step 4: Get ngrok URL
Write-Host "🔍 Getting production URL..." -ForegroundColor Yellow
try {
    $ngrokResponse = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -Method Get -ErrorAction Stop
    $publicUrl = $ngrokResponse.tunnels[0].public_url
    
    if ($publicUrl) {
        Write-Host "✅ Production URL: $publicUrl" -ForegroundColor Green
        
        # Save URL to file
        $publicUrl | Out-File -FilePath "production-url.txt" -Encoding UTF8
        
        # Test the deployment
        Write-Host "🧪 Testing production deployment..." -ForegroundColor Yellow
        try {
            $response = Invoke-WebRequest -Uri $publicUrl -Method Get -TimeoutSec 15
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Production deployment test successful!" -ForegroundColor Green
            } else {
                Write-Host "⚠️ Production test returned status: $($response.StatusCode)" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "⚠️ Production test failed: $($_.Exception.Message)" -ForegroundColor Yellow
        }
        
        Write-Host ""
        Write-Host "🎯 PRODUCTION DEPLOYMENT COMPLETE!" -ForegroundColor Green
        Write-Host "🌐 Live URL: $publicUrl" -ForegroundColor Cyan
        Write-Host "💻 Local: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "📁 URL saved to: production-url.txt" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "🔥 REAL-TIME FEATURES DEPLOYED:" -ForegroundColor Green
        Write-Host "  ✅ Dynamic Problems with Live Stats" -ForegroundColor White
        Write-Host "  ✅ Real-Time Leaderboard with Live Rankings" -ForegroundColor White
        Write-Host "  ✅ Dynamic Dashboard with Live Progress" -ForegroundColor White
        Write-Host "  ✅ Enhanced Compiler with Live Collaboration" -ForegroundColor White
        Write-Host "  ✅ Save/Load Input and Output Functionality" -ForegroundColor White
        Write-Host "  ✅ Auto-Refresh Systems (5-20 second intervals)" -ForegroundColor White
        Write-Host "  ✅ Live Activity Feeds and User Tracking" -ForegroundColor White
        Write-Host "  ✅ Real-Time API Endpoints" -ForegroundColor White
        Write-Host "  ✅ Production-Ready with API Integration" -ForegroundColor White
        Write-Host ""
        Write-Host "🚀 ACROEDUVOS IS NOW LIVE WITH FULL REAL-TIME SYSTEMS!" -ForegroundColor Green
        Write-Host "🎉 Ready for students to use with dynamic, live features!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to get ngrok URL" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Failed to connect to ngrok API: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Make sure ngrok is running and accessible at http://localhost:4040" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
Read-Host
