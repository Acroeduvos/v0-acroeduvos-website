@echo off
echo ========================================
echo   Deploying Acroeduvos to Vercel
echo ========================================
echo.

echo Step 1: Building project...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Please fix errors and try again.
    pause
    exit /b 1
)

echo.
echo Step 2: Installing Vercel CLI (if needed)...
call npm list -g vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
)

echo.
echo Step 3: Deploying to Vercel...
call vercel --prod

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your site is now live!
echo Visit: https://acroeduvos.in
echo.
pause
