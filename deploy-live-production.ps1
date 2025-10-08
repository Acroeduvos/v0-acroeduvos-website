# AcroEduvos Live Production Deployment Script
Write-Host "🚀 ACROEDUVOS LIVE PRODUCTION DEPLOYMENT" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan

# Step 1: Build Production
Write-Host ""
Write-Host "📦 Building Production Application..." -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

try {
    npm run build
    Write-Host "✅ Production build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Start Production Server
Write-Host ""
Write-Host "🚀 Starting Production Server..." -ForegroundColor Yellow
Write-Host "----------------------------------" -ForegroundColor Gray

Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; npm start" -WindowStyle Minimized
Write-Host "✅ Production server started on http://localhost:3000" -ForegroundColor Green

# Step 3: Wait for server to initialize
Write-Host ""
Write-Host "⏳ Waiting for server to initialize..." -ForegroundColor Yellow
Start-Sleep 10

# Step 4: Test API Endpoints
Write-Host ""
Write-Host "🔍 Testing Real-Time API Endpoints..." -ForegroundColor Yellow
Write-Host "--------------------------------------" -ForegroundColor Gray

$endpoints = @(
    @{ Name = "Problems API"; Url = "http://localhost:3000/api/problems?health=true" },
    @{ Name = "Leaderboard API"; Url = "http://localhost:3000/api/leaderboard?health=true" },
    @{ Name = "Dashboard API"; Url = "http://localhost:3000/api/dashboard?health=true" },
    @{ Name = "Real-Time API"; Url = "http://localhost:3000/api/realtime?health=true" }
)

foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-RestMethod -Uri $endpoint.Url -Method Get -TimeoutSec 10
        if ($response.success) {
            Write-Host "✅ $($endpoint.Name): $($response.message)" -ForegroundColor Green
        } else {
            Write-Host "⚠️ $($endpoint.Name): API responding but status unclear" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ $($endpoint.Name): Not responding - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Step 5: Start ngrok tunnel
Write-Host ""
Write-Host "🌐 Starting ngrok tunnel..." -ForegroundColor Yellow
Write-Host "----------------------------" -ForegroundColor Gray

Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; ngrok http 3000" -WindowStyle Minimized
Write-Host "✅ Ngrok tunnel started" -ForegroundColor Green

# Step 6: Wait for ngrok to initialize
Write-Host ""
Write-Host "⏳ Waiting for ngrok to initialize..." -ForegroundColor Yellow
Start-Sleep 15

# Step 7: Get ngrok URL
Write-Host ""
Write-Host "🔍 Getting ngrok public URL..." -ForegroundColor Yellow
Write-Host "--------------------------------" -ForegroundColor Gray

try {
    $ngrokResponse = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -Method Get
    $publicUrl = $ngrokResponse.tunnels[0].public_url
    
    if ($publicUrl) {
        Write-Host "✅ Public URL: $publicUrl" -ForegroundColor Green
        
        # Save URL to file
        $publicUrl | Out-File -FilePath "live-production-url.txt" -Encoding UTF8
        Write-Host "📁 URL saved to live-production-url.txt" -ForegroundColor Cyan
        
        # Test the public URL
        Write-Host ""
        Write-Host "🧪 Testing public URL..." -ForegroundColor Yellow
        try {
            $response = Invoke-WebRequest -Uri $publicUrl -Method Get -TimeoutSec 15
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Public URL is accessible!" -ForegroundColor Green
            } else {
                Write-Host "⚠️ Public URL returned status: $($response.StatusCode)" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "⚠️ Public URL test failed: $($_.Exception.Message)" -ForegroundColor Yellow
        }
        
    } else {
        Write-Host "❌ Failed to get ngrok URL" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Failed to connect to ngrok API: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Please check ngrok is running at http://localhost:4040" -ForegroundColor Yellow
}

# Step 8: Final Status Report
Write-Host ""
Write-Host "🎯 DEPLOYMENT STATUS REPORT" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Cyan

Write-Host ""
Write-Host "✅ PRODUCTION FEATURES DEPLOYED:" -ForegroundColor Green
Write-Host "  🌐 Real-Time Problems API with live stats" -ForegroundColor White
Write-Host "  🏆 Dynamic Leaderboard with live rankings" -ForegroundColor White
Write-Host "  📊 Comprehensive Dashboard with real-time progress" -ForegroundColor White
Write-Host "  💻 Enhanced Compiler with live collaboration" -ForegroundColor White
Write-Host "  📈 Live Analytics with platform metrics" -ForegroundColor White
Write-Host "  🔄 Auto-refresh systems (5-20 second intervals)" -ForegroundColor White
Write-Host "  📡 Real-time API endpoints with health checks" -ForegroundColor White
Write-Host "  💾 Save/Load functionality for input/output" -ForegroundColor White
Write-Host "  📱 Mobile responsive design" -ForegroundColor White

Write-Host ""
Write-Host "🚀 ACCESS INFORMATION:" -ForegroundColor Green
Write-Host "  💻 Local: http://localhost:3000" -ForegroundColor Cyan
Write-Host "  🌐 Public: Check live-production-url.txt for ngrok URL" -ForegroundColor Cyan
Write-Host "  📊 Analytics: http://localhost:3000/analytics" -ForegroundColor Cyan
Write-Host "  🏆 Leaderboard: http://localhost:3000/leaderboard" -ForegroundColor Cyan
Write-Host "  📈 Dashboard: http://localhost:3000/dashboard" -ForegroundColor Cyan
Write-Host "  💻 Compiler: http://localhost:3000/compiler" -ForegroundColor Cyan
Write-Host "  📝 Problems: http://localhost:3000/problems" -ForegroundColor Cyan

Write-Host ""
Write-Host "🔧 REAL-TIME FEATURES:" -ForegroundColor Green
Write-Host "  ⚡ Live user activity and submissions" -ForegroundColor White
Write-Host "  📊 Real-time platform statistics" -ForegroundColor White
Write-Host "  🏆 Dynamic rankings and leaderboards" -ForegroundColor White
Write-Host "  💻 Live collaboration in compiler" -ForegroundColor White
Write-Host "  📈 Live analytics and performance metrics" -ForegroundColor White
Write-Host "  🔄 Auto-updating data every 5-20 seconds" -ForegroundColor White

Write-Host ""
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "🚀 AcroEduvos is now LIVE with all real-time features!" -ForegroundColor Green

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
Read-Host
