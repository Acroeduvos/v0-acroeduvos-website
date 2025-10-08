# AcroEduvos Ngrok Configuration Script
# Run this after getting your auth token from https://dashboard.ngrok.com/get-started/your-authtoken

param(
    [Parameter(Mandatory=$true)]
    [string]$AuthToken
)

Write-Host "🚀 Configuring Ngrok for AcroEduvos Deployment" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

# Set the authtoken
Write-Host "🔐 Setting ngrok authtoken..." -ForegroundColor Yellow
& "D:\ngrok\ngrok.exe" authtoken $AuthToken

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Ngrok authentication successful!" -ForegroundColor Green
    
    # Start the tunnel
    Write-Host "🌐 Starting ngrok tunnel..." -ForegroundColor Yellow
    Start-Process -FilePath "D:\ngrok\ngrok.exe" -ArgumentList "http", "3000" -WindowStyle Minimized
    
    # Wait for tunnel to start
    Start-Sleep -Seconds 5
    
    # Get and display tunnel URL
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels"
        $publicUrl = $response.tunnels[0].public_url
        
        Write-Host "`n🎉 SUCCESS! Your AcroEduvos app is now public!" -ForegroundColor Green
        Write-Host "📱 Public URL: $publicUrl" -ForegroundColor Cyan
        Write-Host "🌍 Local URL: http://localhost:3000" -ForegroundColor Cyan
        
        Write-Host "`n📋 Next Steps for acroeduvos.in:" -ForegroundColor Yellow
        
        $hostname = $publicUrl.Replace("https://", "")
        Write-Host "1. Connect your domain:" -ForegroundColor White
        Write-Host "   Method A - DNS CNAME:" -ForegroundColor Cyan
        Write-Host "   Type: CNAME" -ForegroundColor Gray
        Write-Host "   Name: acroeduvos.in" -ForegroundColor Gray  
        Write-Host "   Value: $hostname" -ForegroundColor Gray
        Write-Host "   `n   Method B - Domain Forwarding:" -ForegroundColor Cyan
        Write-Host "   Forward acroeduvos.in → $publicUrl" -ForegroundColor Gray
        
        Write-Host "`n2. Test your application:" -ForegroundColor White
        Write-Host "   • Open: $publicUrl" -ForegroundColor Cyan
        Write-Host "   • Verify all features work" -ForegroundColor Cyan
        
        Write-Host "`n3. Manage your deployment:" -ForegroundColor White
        Write-Host "   • Dashboard: http://localhost:4040" -ForegroundColor Cyan
        Write-Host "   • Stop tunnel: Close ngrok window" -ForegroundColor Cyan
        
        # Create a file with the public URL for reference
        $publicUrl | Out-File -FilePath "public-url.txt" -Encoding UTF8
        Write-Host "`n💾 Public URL saved to: public-url.txt" -ForegroundColor Green
        
    } catch {
        Write-Host "❌ Could not retrieve tunnel URL" -ForegroundColor Red
        Write-Host "Make sure ngrok started successfully" -ForegroundColor Yellow
    }
    
} else {
    Write-Host "❌ Ngrok authentication failed!" -ForegroundColor Red
    Write-Host "Please check your auth token and try again" -ForegroundColor Yellow
}

Write-Host "`n🎯 Your AcroEduvos app is ready for the world!" -ForegroundColor Green
