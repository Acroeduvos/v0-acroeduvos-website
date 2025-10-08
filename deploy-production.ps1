# AcroEduvos Production Deployment Script
Write-Host "🚀 Starting AcroEduvos Production Deployment..." -ForegroundColor Green

# Start the Next.js production server
Write-Host "📦 Starting Next.js production server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; npm start" -WindowStyle Minimized

# Wait for server to start
Write-Host "⏳ Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep 5

# Start ngrok tunnel
Write-Host "🌐 Starting ngrok tunnel..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; ngrok http 3000" -WindowStyle Minimized

# Wait for ngrok to start
Write-Host "⏳ Waiting for ngrok to start..." -ForegroundColor Yellow
Start-Sleep 8

# Get ngrok URL
Write-Host "🔍 Getting ngrok URL..." -ForegroundColor Yellow
try {
    $ngrokResponse = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -Method Get
    $publicUrl = $ngrokResponse.tunnels[0].public_url
    
    if ($publicUrl) {
        Write-Host "✅ Ngrok URL: $publicUrl" -ForegroundColor Green
        Write-Host "🎉 AcroEduvos is now live at: $publicUrl" -ForegroundColor Green
        
        # Save URL to file
        $publicUrl | Out-File -FilePath "production-url.txt" -Encoding UTF8
        
        # Test the deployment
        Write-Host "🧪 Testing deployment..." -ForegroundColor Yellow
        try {
            $response = Invoke-WebRequest -Uri $publicUrl -Method Get -TimeoutSec 10
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Deployment test successful!" -ForegroundColor Green
            } else {
                Write-Host "⚠️ Deployment test returned status: $($response.StatusCode)" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "⚠️ Deployment test failed: $($_.Exception.Message)" -ForegroundColor Yellow
        }
        
        Write-Host ""
        Write-Host "🎯 DEPLOYMENT COMPLETE!" -ForegroundColor Green
        Write-Host "🌐 Live URL: $publicUrl" -ForegroundColor Cyan
        Write-Host "💻 Local: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "📁 URL saved to: production-url.txt" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "✅ Features Available:" -ForegroundColor Green
        Write-Host "  • Save/Load Input and Output" -ForegroundColor White
        Write-Host "  • Real-time Compiler with Fallback" -ForegroundColor White
        Write-Host "  • Competitive Programming Problems" -ForegroundColor White
        Write-Host "  • Leaderboard System" -ForegroundColor White
        Write-Host "  • Multi-language Support" -ForegroundColor White
        Write-Host "  • Mobile Responsive Design" -ForegroundColor White
        Write-Host ""
        Write-Host "🚀 Ready for students to use!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to get ngrok URL" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Failed to connect to ngrok API: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure ngrok is running and accessible at http://localhost:4040" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
Read-Host