@echo off
echo ========================================
echo    DEPLOYING ACROEDUVOS TO ACROEDUVOS.IN
echo ========================================
echo.

echo [1/5] Opening Vercel deployment page...
start https://vercel.com/new

echo.
echo [2/5] Please follow these steps:
echo    1. Click "Import Git Repository"
echo    2. Search for "Acroeduvos/v0-acroeduvos-website"
echo    3. Click "Deploy"
echo    4. Wait for deployment to complete
echo.

echo [3/5] Opening Vercel dashboard...
start https://vercel.com/dashboard

echo.
echo [4/5] After deployment, please:
echo    1. Go to your project settings
echo    2. Click "Domains" tab
echo    3. Add "acroeduvos.in"
echo    4. Add "www.acroeduvos.in"
echo.

echo [5/5] Opening domain DNS guide...
start https://vercel.com/docs/concepts/projects/domains/add-a-domain

echo.
echo ========================================
echo    DEPLOYMENT INSTRUCTIONS COMPLETE
echo ========================================
echo.
echo Next steps:
echo 1. Deploy on Vercel (web interface)
echo 2. Add domain in Vercel settings
echo 3. Configure DNS at your domain provider
echo 4. Wait for DNS propagation (5-15 minutes)
echo 5. Test acroeduvos.in
echo.
echo Current public access: https://acroeduvos-live.loca.lt
echo.
pause
