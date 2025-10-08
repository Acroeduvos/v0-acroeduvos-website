@echo off
echo 🚀 AcroEduvos Live Deployment
echo =============================
echo.

REM Check if Next.js is running
echo 🔍 Checking Next.js server...
netstat -an | findstr ":3000" > nul
if %errorlevel% neq 0 (
    echo ❌ Next.js server not running. Starting it now...
    start /b "nextjs-server" npm run dev
    echo ⏳ Waiting for server to start...
    timeout /t 10 /nobreak > nul
) else (
    echo ✅ Next.js server is running on port 3000
)

REM Start localtunnel
echo 🌐 Creating public tunnel...
echo Starting localtunnel...
start /b "localtunnel" npx localtunnel --port 3000

REM Wait for tunnel to be ready
echo ⏳ Waiting for tunnel to be ready...
timeout /t 8 /nobreak > nul

REM Get the latest tunnel URL from the output
echo 🔍 Getting tunnel URL...
for /f "tokens=*" %%i in ('npx localtunnel --port 3000 2^>^&1 ^| findstr "your url is"') do set TUNNEL_OUTPUT=%%i

REM Extract URL from output
for /f "tokens=4" %%a in ("%TUNNEL_OUTPUT%") do set PUBLIC_URL=%%a

if "%PUBLIC_URL%"=="" (
    echo ❌ Could not get tunnel URL. Trying alternative method...
    echo Please check the localtunnel output manually.
    echo.
    echo 📋 Manual Steps:
    echo 1. Look for a URL like: https://random-words.loca.lt
    echo 2. Test the URL in your browser
    echo 3. Configure your domain to point to this URL
    echo.
    pause
    exit /b 1
)

echo.
echo 🎉 SUCCESS! Your AcroEduvos app is now live!
echo 📱 Public URL: %PUBLIC_URL%
echo 🌍 Local URL: http://localhost:3000

REM Save the URL to a file
echo %PUBLIC_URL% > public-url.txt
echo 💾 Public URL saved to: public-url.txt

echo.
echo 📋 Next Steps for acroeduvos.in:
echo.
echo Method 1 - DNS CNAME Record:
echo 1. Go to your domain registrar (where you bought acroeduvos.in)
echo 2. Add a CNAME record:
echo    Type: CNAME
echo    Name: @ (or leave blank for root domain)
echo    Value: %PUBLIC_URL:~8% (remove https://)
echo    TTL: 300 (or default)
echo.
echo Method 2 - Domain Forwarding:
echo 1. Go to your domain registrar
echo 2. Set up domain forwarding:
echo    Forward: acroeduvos.in
echo    To: %PUBLIC_URL%
echo    Enable: Mask forwarding (optional)
echo.
echo Method 3 - Cloudflare (Recommended):
echo 1. Add your domain to Cloudflare (free)
echo 2. Create a CNAME record:
echo    Name: @
echo    Content: %PUBLIC_URL:~8%
echo    Proxy status: Proxied (orange cloud)
echo.

echo 🔧 Managing your deployment:
echo • View local app: http://localhost:3000
echo • View public app: %PUBLIC_URL%
echo • Stop deployment: Close this window
echo.

echo ⏳ Deployment is running... Press any key to stop
pause

echo 🛑 Stopping deployment...
taskkill /f /im node.exe >nul 2>&1
echo ✅ Deployment stopped
pause
