# Deploy Acroeduvos to acroeduvos.in
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEPLOYING ACROEDUVOS TO ACROEDUVOS.IN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/5] Opening Vercel deployment page..." -ForegroundColor Green
Start-Process "https://vercel.com/new"

Write-Host ""
Write-Host "[2/5] Please follow these steps:" -ForegroundColor Yellow
Write-Host "   1. Click 'Import Git Repository'" -ForegroundColor White
Write-Host "   2. Search for 'Acroeduvos/v0-acroeduvos-website'" -ForegroundColor White
Write-Host "   3. Click 'Deploy'" -ForegroundColor White
Write-Host "   4. Wait for deployment to complete" -ForegroundColor White
Write-Host ""

Write-Host "[3/5] Opening Vercel dashboard..." -ForegroundColor Green
Start-Process "https://vercel.com/dashboard"

Write-Host ""
Write-Host "[4/5] After deployment, please:" -ForegroundColor Yellow
Write-Host "   1. Go to your project settings" -ForegroundColor White
Write-Host "   2. Click 'Domains' tab" -ForegroundColor White
Write-Host "   3. Add 'acroeduvos.in'" -ForegroundColor White
Write-Host "   4. Add 'www.acroeduvos.in'" -ForegroundColor White
Write-Host ""

Write-Host "[5/5] Opening domain DNS guide..." -ForegroundColor Green
Start-Process "https://vercel.com/docs/concepts/projects/domains/add-a-domain"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   DEPLOYMENT INSTRUCTIONS COMPLETE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Deploy on Vercel (web interface)" -ForegroundColor White
Write-Host "2. Add domain in Vercel settings" -ForegroundColor White
Write-Host "3. Configure DNS at your domain provider" -ForegroundColor White
Write-Host "4. Wait for DNS propagation (5-15 minutes)" -ForegroundColor White
Write-Host "5. Test acroeduvos.in" -ForegroundColor White
Write-Host ""
Write-Host "Current public access: https://acroeduvos-live.loca.lt" -ForegroundColor Magenta
Write-Host ""

Read-Host "Press Enter to continue..."
