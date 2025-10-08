# Ngrok Setup Guide for AcroEduvos

## Quick Setup (Free Method)

### Option 1: Manual Ngrok Setup
1. **Sign up for free ngrok account:**
   - Go to: https://dashboard.ngrok.com/signup
   - Create account with your email

2. **Get your authtoken:**
   - Login to: https://dashboard.ngrok.com/get-started/your-authtoken
   - Copy the authtoken

3. **Configure ngrok:**
   ```powershell
   D:\ngrok\ngrok.exe authtoken YOUR_AUTHTOKEN_HERE
   ```

4. **Start tunnel:**
   ```powershell
   D:\ngrok\ngrok.exe http 3000
   ```

5. **Get public URL:**
   - Visit: http://localhost:4040
   - You'll see your public URL (like https://abc123.ngrok.io)

### Option 2: Live Server Alternative (No Auth Required)
If you prefer not to use ngrok, you can use other services like:
- **serveo.net**: `ssh -R 80:localhost:3000 serveo.net`
- **localtunnel**: `npx localtunnel --port 3000`

## Domain Connection

Once you have your ngrok URL, you have several options to connect acroeduvos.in:

### Method 1: DNS CNAME Record
Add a CNAME record in your DNS settings:
```
Type: CNAME
Name: acroeduvos.in
Value: your-ngrok-url.ngrok.io
```

### Method 2: Domain Forwarding
Most domain registrars offer forwarding service:
- Forward acroeduvos.in → your-ngrok-url.ngrok.io
- Enable SSL forwarding for HTTPS

### Method 3: Cloudflare Proxy (Recommended)
1. Add your domain to Cloudflare (free)
2. Create a CNAME record pointing to ngrok URL
3. Enable proxy (orange cloud)
4. SSL/TLS will be automatically handled

## Recommended Commands

### Start Development Server
```bash
cd C:\Users\Lenovo\OneDrive\Documents\AcroEduvos
npm run dev
```

### Start Ngrok Tunnel (after auth)
```powershell
D:\ngrok\ngrok.exe http 3000 --host-header=localhost:3000
```

### Test Both Services
- Local: http://localhost:3000
- Public: https://your-ngrok-url.ngrok.io

## Advanced: Custom Subdomain (Paid Feature)
If you want acroeduvos.ngrok.io instead of random URL:
1. Upgrade to paid ngrok plan
2. Reserve custom subdomain: `acroeduvos`
3. Run: `D:\ngrok\ngrok.exe http 3000 --subdomain=acroeduvos`
