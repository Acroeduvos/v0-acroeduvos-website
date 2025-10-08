# AcroEduvos Deployment Script
# This script will deploy your app and connect it to acroeduvos.in

Write-Host "🚀 AcroEduvos Deployment Starting..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Check if Next.js is running
Write-Host "🔍 Checking Next.js server..." -ForegroundColor Yellow
$portCheck = netstat -an | findstr ":3000"
if (!$portCheck) {
    Write-Host "❌ Next.js server not running. Starting it now..." -ForegroundColor Red
    Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory "C:\Users\Lenovo\OneDrive\Documents\AcroEduvos" -WindowStyle Minimized
    Write-Host "⏳ Waiting for server to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
} else {
    Write-Host "✅ Next.js server is running on port 3000" -ForegroundColor Green
}

# Try localtunnel first (no auth required)
Write-Host "`n🌐 Setting up public tunnel..." -ForegroundColor Yellow
Write-Host "Attempting localtunnel (no authentication required)..." -ForegroundColor Cyan

try {
    # Start localtunnel in background
    $ltJob = Start-Job -ScriptBlock {
        & lt --port 3000 --subdomain acroeduvos
    }
    
    Start-Sleep -Seconds 5
    
    # Test the tunnel
    $testUrl = "https://acroeduvos.loca.lt"
    Write-Host "🔍 Testing tunnel at: $testUrl" -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri $testUrl -TimeoutSec 10 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Localtunnel successful!" -ForegroundColor Green
            Write-Host "📱 Public URL: $testUrl" -ForegroundColor Cyan
            
            # Create domain setup instructions
            Write-Host "`n📋 Domain Setup Instructions:" -ForegroundColor Yellow
            Write-Host "1. Go to your domain registrar (where you bought acroeduvos.in)" -ForegroundColor White
            Write-Host "2. Add a CNAME record:" -ForegroundColor White
            Write-Host "   Type: CNAME" -ForegroundColor Gray
            Write-Host "   Name: @ (or leave blank)" -ForegroundColor Gray
            Write-Host "   Value: acroeduvos.loca.lt" -ForegroundColor Gray
            Write-Host "   TTL: 300 (or default)" -ForegroundColor Gray
            
            Write-Host "`n3. Alternative - Domain Forwarding:" -ForegroundColor White
            Write-Host "   Forward acroeduvos.in → $testUrl" -ForegroundColor Gray
            
            # Save the public URL
            $testUrl | Out-File -FilePath "public-url.txt" -Encoding UTF8
            Write-Host "`n💾 Public URL saved to: public-url.txt" -ForegroundColor Green
            
            Write-Host "`n🎉 Your AcroEduvos app is now live!" -ForegroundColor Green
            Write-Host "🌍 Local: http://localhost:3000" -ForegroundColor Cyan
            Write-Host "🌐 Public: $testUrl" -ForegroundColor Cyan
            
            # Keep the script running
            Write-Host "`n⏳ Tunnel is active. Press Ctrl+C to stop..." -ForegroundColor Yellow
            while ($true) {
                Start-Sleep -Seconds 30
                # Check if tunnel is still working
                try {
                    $healthCheck = Invoke-WebRequest -Uri $testUrl -TimeoutSec 5 -UseBasicParsing
                    if ($healthCheck.StatusCode -ne 200) {
                        Write-Host "⚠️  Tunnel health check failed. Restarting..." -ForegroundColor Yellow
                        Stop-Job $ltJob -ErrorAction SilentlyContinue
                        Remove-Job $ltJob -ErrorAction SilentlyContinue
                        $ltJob = Start-Job -ScriptBlock { & lt --port 3000 --subdomain acroeduvos }
                        Start-Sleep -Seconds 5
                    }
                } catch {
                    Write-Host "⚠️  Health check error: $($_.Exception.Message)" -ForegroundColor Yellow
                }
            }
            
        } else {
            throw "Unexpected status code: $($response.StatusCode)"
        }
    } catch {
        Write-Host "❌ Localtunnel test failed: $($_.Exception.Message)" -ForegroundColor Red
        throw
    }
    
} catch {
    Write-Host "❌ Localtunnel setup failed. Trying ngrok..." -ForegroundColor Red
    
    # Fallback to ngrok
    Write-Host "`n🔧 Setting up ngrok (requires authentication)..." -ForegroundColor Yellow
    Write-Host "Please get your auth token from: https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor Cyan
    
    $authToken = Read-Host "Enter your ngrok auth token"
    
    if ($authToken) {
        Write-Host "🔐 Configuring ngrok..." -ForegroundColor Yellow
        & "D:\ngrok\ngrok.exe" authtoken $authToken
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Ngrok configured successfully!" -ForegroundColor Green
            
            # Start ngrok
            Start-Process -FilePath "D:\ngrok\ngrok.exe" -ArgumentList "http", "3000" -WindowStyle Minimized
            Start-Sleep -Seconds 5
            
            # Get ngrok URL
            try {
                $ngrokResponse = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels"
                $ngrokUrl = $ngrokResponse.tunnels[0].public_url
                
                Write-Host "🎉 Ngrok tunnel created!" -ForegroundColor Green
                Write-Host "📱 Public URL: $ngrokUrl" -ForegroundColor Cyan
                
                # Save the URL
                $ngrokUrl | Out-File -FilePath "public-url.txt" -Encoding UTF8
                
                Write-Host "`n📋 Domain Setup for acroeduvos.in:" -ForegroundColor Yellow
                $hostname = $ngrokUrl.Replace("https://", "")
                Write-Host "Add CNAME record: acroeduvos.in → $hostname" -ForegroundColor White
                
            } catch {
                Write-Host "❌ Could not get ngrok URL" -ForegroundColor Red
            }
        } else {
            Write-Host "❌ Ngrok authentication failed" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ No auth token provided" -ForegroundColor Red
    }
}

# Cleanup on exit
Register-EngineEvent PowerShell.Exiting -Action {
    Write-Host "`n🛑 Cleaning up..." -ForegroundColor Yellow
    Get-Job | Where-Object {$_.Command -like "*lt*"} | Stop-Job
    Get-Job | Where-Object {$_.Command -like "*lt*"} | Remove-Job
    Get-Process -Name "ngrok" -ErrorAction SilentlyContinue | Stop-Process -Force
}
