const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Acroeduvos deployment...');

// Check if .env exists
if (!fs.existsSync('.env')) {
    console.log('📝 Creating .env file...');
    fs.copyFileSync('env.example', '.env');
    console.log('✅ .env file created from template');
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
} catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
}

// Build the application
console.log('🔨 Building application...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Application built successfully');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}

// Start the application
console.log('🌟 Starting Acroeduvos server...');
console.log('');
console.log('🎉 Deployment complete!');
console.log('📱 Your application is running at:');
console.log('   • HTTP:  http://localhost:3000');
console.log('   • HTTPS: https://localhost:3000 (with SSL)');
console.log('');
console.log('🔧 To stop the server, press Ctrl+C');
console.log('📚 For production deployment, see SELF-HOSTING.md');
console.log('');

// Start the server
try {
    execSync('npm start', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
}
