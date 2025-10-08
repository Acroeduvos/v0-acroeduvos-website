@echo off
echo 🚀 AcroEduvos Deployment Setup via Ngrok
echo =========================================
echo.

REM Check if Next.js is running
echo 🔍 Checking Next.js server...
netstat -an | findstr ":3000" > nul
if %errorlevel% neq 0 (
    echo ❌ Next.js server not running on port 3000
    echo Please start your Next.js app first:
    echo   cd C:\Users\Lenovo\OneDrive\Documents\AcroEduvos
    echo   npm run dev
    pause
    exit /b 1
)
echo ✅ Next.js server is running on port 3000

REM Check ngrok authentication
echo 🔐 Checking ngrok authentication...
D:\ngrok\ngrok.exe config check >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Ngrok authentication required!
    echo.
    echo 📝 Please follow these steps:
    echo 1. Visit: https://dashboard.ngrok.com/signup
    echo 2. Create a free account
    echo 3. Get your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken
    echo 4. Run: D:\ngrok\ngrok.exe authtoken YOUR_AUTHTOKEN_HERE
    echo 5. Run this script again
    echo.
    pause
    exit /b 1
)
echo ✅ Ngrok authentication configured

REM Start ngrok tunnel
echo 🌐 Creating ngrok tunnel...
start /b "ngrok-tunnel" D:\ngrok\ngrok.exe http 3000

REM Wait for tunnel to be ready
echo ⏳ Waiting for tunnel to be ready...
timeout /t 3 /nobreak > nul

REM Get tunnel URL
echo 🔍 Getting tunnel URL...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:4040/api/tunnels'; $publicUrl = $response.tunnels[0].public_url; Write-Host '🎉 Tunnel created successfully!'; Write-Host \"📱 Public URL: $publicUrl\" -ForegroundColor Cyan; Write-Host '🌍 Local URL: http://localhost:3000' -ForegroundColor Cyan; Write-Host ''; Write-host '📋 Next Steps:'; Write-Host '1. Test your app at: ' -NoNewline; Write-Host \"$publicUrl\" -ForegroundColor Cyan; $hostname = $publicUrl.Replace('https://', ''); Write-Host \"2. Configure DNS for acroeduvos.in:\"; Write-Host \"   • Add CNAME record: acroeduvos.in → $hostname\"; Write-Host \"   • Or use domain forwarding service.\"; Write-Host ''; Write-Host '🔧 Managing the tunnel:'; Write-Host '• View dashboard: http://localhost:4040'; Write-Host '• Stop: Close this window or Ctrl+C' } catch { Write-Host '❌ Failed to get tunnel URL' -ForegroundColor Red; Write-Host 'Make sure ngrok is running properly' -ForegroundColor Yellow }"

echo.
echo ⏳ Tunnel is running... Press any key to stop
echo Your AcroEduvos app will be accessible via the public URL above
echo.
pause

echo 🛑 Stopping ngrok tunnel...
taskkill /f /im ngrok.exe >nul 2>&1
echo ✅ Tunnel stopped
pause
