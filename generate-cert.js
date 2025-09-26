const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔐 Generating self-signed SSL certificate for Acroeduvos...');

// Create SSL directory if it doesn't exist
if (!fs.existsSync('ssl')) {
    fs.mkdirSync('ssl');
}

try {
    // Generate private key
    execSync('openssl genrsa -out ssl/key.pem 2048', { stdio: 'inherit' });
    
    // Generate certificate
    execSync('openssl req -new -x509 -key ssl/key.pem -out ssl/cert.pem -days 365 -subj "/C=US/ST=State/L=City/O=Acroeduvos/CN=acroeduvos.in"', { stdio: 'inherit' });
    
    console.log('✅ SSL certificate generated successfully!');
    console.log('Certificate: ssl/cert.pem');
    console.log('Private Key: ssl/key.pem');
    console.log('');
    console.log('⚠️  Note: This is a self-signed certificate for development purposes.');
    console.log('   Browsers will show security warnings. For production, use Let\'s Encrypt.');
    console.log('');
    console.log('🚀 You can now run: npm run deploy');
} catch (error) {
    console.error('❌ Error generating SSL certificate:', error.message);
    console.log('');
    console.log('Please install OpenSSL or use the PowerShell script instead.');
    process.exit(1);
}

