@echo off
echo Starting AcroEduvos Network Deployment...
echo.

REM Set environment variables for network access
set CUSTOM_HOST=0.0.0.0
set CUSTOM_PORT=3000
set NODE_ENV=production

echo Building application for network deployment...
call npm run build

if %errorlevel% neq 0 (
    echo Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo Starting server on network...
echo Server will be accessible at:
echo - http://localhost:3000
echo - http://127.0.0.1:3000
echo - http://172.16.20.X:3000 (where X is any IP in range 1-255)
echo - http://acroeduvos.in:3000
echo.

call npm run start:network

pause
