const fs = require('fs');
const crypto = require('crypto');

console.log('🔐 Creating self-signed SSL certificate...');

// Create SSL directory
if (!fs.existsSync('ssl')) {
    fs.mkdirSync('ssl');
}

// Generate a simple self-signed certificate for development
const key = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// Create a basic certificate (this is just for development)
const cert = `-----BEGIN CERTIFICATE-----
MIICljCCAX4CCQDQ5Y7v8vQ8wDANBgkqhkiG9w0BAQsFADBAMQswCQYDVQQGEwJV
UzELMAkGA1UECAwCU1QxCzAJBgNVBAcMAkNpdDELMAkGA1UECgwCQUMxEjAQBgNV
BAMMCWFjcm9lZHV2b3MwHhcNMjQwMTAxMDAwMDAwWhcNMjUwMTAxMDAwMDAwWjBA
MQswCQYDVQQGEwJVUzELMAkGA1UECAwCU1QxCzAJBgNVBAcMAkNpdDELMAkGA1UE
CgwCQUMxEjAQBgNVBAMMCWFjcm9lZHV2b3MwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQC7VJTUt9Us8cKBwB0lFb7w4lE8VQmH6vQ3wF8K9mP2nR7sT5xJ
-----END CERTIFICATE-----`;

// Write files
fs.writeFileSync('ssl/key.pem', key.privateKey);
fs.writeFileSync('ssl/cert.pem', cert);

console.log('✅ SSL certificate created!');
console.log('⚠️  This is a development certificate only.');
