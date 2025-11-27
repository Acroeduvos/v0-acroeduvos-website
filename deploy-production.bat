@echo off
echo 🚀 Starting AcroEduvos Production Deployment...

REM Set production environment variables
set NODE_ENV=production
set NEXT_PUBLIC_APP_URL=https://acroeduvos.in
set NEXT_PUBLIC_API_URL=https://acroeduvos.in/api
set NEXT_PUBLIC_SUPPORT_EMAIL=support@acroeduvos.in
set CUSTOM_HOST=0.0.0.0
set CUSTOM_PORT=3000

echo 📦 Installing dependencies...
call npm ci --production

echo 🔨 Building production application...
call npm run build

echo 🧹 Cleaning up development files...
if exist .next\cache rmdir /s /q .next\cache
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo 📊 Build completed successfully!
echo.
echo 🌐 Application will be available at:
echo   - http://localhost:3000
echo   - http://172.16.20.X:3000 (network access)
echo   - https://acroeduvos.in:3000
echo.
echo 🚀 Starting production server...

REM Start the production server
call npm run start

echo ✅ AcroEduvos Production Deployment Complete!
pause
