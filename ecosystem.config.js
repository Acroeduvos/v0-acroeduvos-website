module.exports = {
  apps: [{
    name: 'acroeduvos',
    script: 'npm',
    args: 'run dev',
    cwd: './',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }],
  
  deploy: {
    production: {
      user: 'node',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'your-github-repo',
      path: '/var/www/acroeduvos',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
