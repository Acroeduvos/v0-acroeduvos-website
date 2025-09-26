# PowerShell script to generate self-signed SSL certificate
# This creates a self-signed certificate for development purposes

Write-Host "🔐 Generating self-signed SSL certificate for Acroeduvos..." -ForegroundColor Green

# Create SSL directory if it doesn't exist
if (!(Test-Path "ssl")) {
    New-Item -ItemType Directory -Path "ssl" | Out-Null
}

# Generate self-signed certificate using PowerShell
$cert = New-SelfSignedCertificate -DnsName "acroeduvos.in", "localhost" -CertStoreLocation "cert:\LocalMachine\My" -NotAfter (Get-Date).AddDays(365)

# Export certificate to PEM format
$certPath = "cert:\LocalMachine\My\$($cert.Thumbprint)"
$certBytes = $cert.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)
$certPem = [System.Convert]::ToBase64String($certBytes)
$certPem = $certPem -replace ".{64}", "`$&`n"
$certPem = "-----BEGIN CERTIFICATE-----`n$certPem`n-----END CERTIFICATE-----"

# Export private key to PEM format
$keyBytes = $cert.PrivateKey.Export([System.Security.Cryptography.CngKeyBlobFormat]::Pkcs8PrivateBlob)
$keyPem = [System.Convert]::ToBase64String($keyBytes)
$keyPem = $keyPem -replace ".{64}", "`$&`n"
$keyPem = "-----BEGIN PRIVATE KEY-----`n$keyPem`n-----END PRIVATE KEY-----"

# Write certificate and key to files
$certPem | Out-File -FilePath "ssl\cert.pem" -Encoding ASCII
$keyPem | Out-File -FilePath "ssl\key.pem" -Encoding ASCII

Write-Host "✅ SSL certificate generated successfully!" -ForegroundColor Green
Write-Host "Certificate: ssl\cert.pem" -ForegroundColor Yellow
Write-Host "Private Key: ssl\key.pem" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Note: This is a self-signed certificate for development purposes." -ForegroundColor Red
Write-Host "   Browsers will show security warnings. For production, use Let's Encrypt." -ForegroundColor Red

# Clean up certificate from store
Remove-Item -Path $certPath -Force

Write-Host ""
Write-Host "🚀 You can now run: deploy.bat" -ForegroundColor Green