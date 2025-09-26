@echo off
REM SSL Certificate Setup Script for Acroeduvos (Windows)
REM This script helps you set up SSL certificates for your domain

echo 🔐 Setting up SSL certificates for Acroeduvos...

REM Create SSL directory
if not exist ssl mkdir ssl

echo Choose your SSL certificate option:
echo 1. Self-signed certificate (For development/testing)
echo 2. Use existing certificates
echo 3. Exit
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto self_signed
if "%choice%"=="2" goto existing
if "%choice%"=="3" goto exit
goto invalid

:self_signed
echo [INFO] Generating self-signed SSL certificate...

set /p domain="Enter your domain name (e.g., acroeduvos.in): "

REM Check if OpenSSL is available
openssl version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] OpenSSL is not installed. Please install OpenSSL first.
    echo [INFO] Download from: https://slproweb.com/products/Win32OpenSSL.html
    pause
    exit /b 1
)

REM Generate private key
openssl genrsa -out ssl\key.pem 2048

REM Generate certificate
openssl req -new -x509 -key ssl\key.pem -out ssl\cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Organization/CN=%domain%"

echo [INFO] ✅ Self-signed certificate generated successfully!
echo [WARNING] Note: Self-signed certificates will show security warnings in browsers.
echo [WARNING] This is only suitable for development/testing purposes.
goto end

:existing
echo [INFO] Using existing certificates...

set /p cert_path="Enter path to your certificate file: "
set /p key_path="Enter path to your private key file: "

if not exist "%cert_path%" (
    echo [ERROR] Certificate file not found: %cert_path%
    pause
    exit /b 1
)

if not exist "%key_path%" (
    echo [ERROR] Private key file not found: %key_path%
    pause
    exit /b 1
)

REM Copy certificates
copy "%cert_path%" ssl\cert.pem
copy "%key_path%" ssl\key.pem

echo [INFO] ✅ Certificates copied successfully!
goto end

:exit
echo [INFO] Exiting...
exit /b 0

:invalid
echo [ERROR] Invalid choice. Please run the script again.
pause
exit /b 1

:end
echo [INFO] SSL certificates are ready in the ssl\ directory!
echo [INFO] You can now run the deployment script: deploy.bat
pause
