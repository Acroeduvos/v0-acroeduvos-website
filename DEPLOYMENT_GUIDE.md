# AcroEduvos Deployment Guide

This guide will help you deploy the AcroEduvos platform to a production environment.

## Prerequisites
- Node.js 18+ installed
- Git installed
- A Vercel account (recommended for easiest deployment) OR a VPS (Ubuntu/Debian)

## Option 1: Deploy to Vercel (Recommended)
Vercel is the creators of Next.js and offers the best hosting experience.

1.  **Push to GitHub/GitLab/Bitbucket**:
    - Push your code to a remote repository.
2.  **Import to Vercel**:
    - Go to [vercel.com/new](https://vercel.com/new).
    - Select your repository.
3.  **Configure Environment Variables**:
    - Add the following environment variables in the Vercel dashboard:
        - `JUDGE0_API_KEY`: Your Judge0 API key (optional, for real compiler).
        - `NEXT_PUBLIC_APP_URL`: `https://your-project.vercel.app`
4.  **Deploy**:
    - Click "Deploy". Vercel will handle the build and deployment automatically.

## Option 2: Self-Hosting (VPS/Local)
If you want to host it on your own server or locally.

### 1. Build the Application
Run the production build command:
```bash
npm run build
```

### 2. Start the Server
Start the production server:
```bash
npm run start
```
The app will be available at `http://localhost:3000`.

### 3. Using the Deployment Script (Windows)
We have included a script to automate this on Windows:
1.  Double-click `deploy-production.bat`.
2.  This will install dependencies, build the app, and start the server.

## Features Verification
- **Compiler**: The compiler uses a "Cascade Strategy".
    1.  **Judge0**: If you provided an API Key, it uses the robust remote compiler.
    2.  **Local**: If no key, it tries to use local compilers (`python`, `gcc`, etc.) if installed.
    3.  **Simulation**: If both fail, it falls back to a realistic simulation mode so the UI never breaks.
- **Real-time**: The site uses simulated real-time stats for demonstration. For actual real-time features, you would need to integrate a WebSocket server (e.g., Supabase Realtime).

## Troubleshooting
- **Compiler not working?**
    - Check the console logs.
    - If you see "Simulation Mode", it means local compilers were not found and no API key was provided. This is normal behavior for a demo.
- **Build fails?**
    - Run `npm run lint` to check for code errors.
    - Ensure all dependencies are installed with `npm install`.
