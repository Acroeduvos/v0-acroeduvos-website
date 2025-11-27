# Connecting Hostinger Domain to AcroEduvos

Since you have purchased your domain on **Hostinger**, the best way to make your site live is to deploy the code to **Vercel** (which is free and optimized for Next.js) and then point your Hostinger domain to it.

## Step 1: Deploy to Vercel (If not done yet)
1.  Go to [vercel.com/new](https://vercel.com/new).
2.  Import your GitHub repository: `v0-acroeduvos-website`.
3.  Click **Deploy**.
4.  Wait for the deployment to finish. You will get a link like `acroeduvos.vercel.app`.

## Step 2: Add Domain in Vercel
1.  Go to your project dashboard on Vercel.
2.  Click on **Settings** -> **Domains**.
3.  Enter your domain name (e.g., `acroeduvos.in`) and click **Add**.
4.  Vercel will show you a **Recommended** configuration (usually an **A Record** and a **CNAME**).

## Step 3: Configure Hostinger DNS
1.  Log in to your **Hostinger** account.
2.  Go to **Domains** and select your domain.
3.  Click on **DNS / Nameservers**.
4.  **Delete** any existing "A" records that point to "Parked" or Hostinger default pages.
5.  **Add the Vercel Records**:

    **Type**: A
    **Name**: @
    **Points to**: `76.76.21.21` (This is Vercel's IP)
    **TTL**: 3600

    **Type**: CNAME
    **Name**: www
    **Points to**: `cname.vercel-dns.com`
    **TTL**: 3600

6.  Click **Update** or **Save**.

## Step 4: Verification
1.  Go back to the Vercel Domains page.
2.  It might take a few minutes (up to 24 hours, but usually fast) for the changes to propagate.
3.  Once the icons turn **Green**, your site is live at `https://your-domain.com`!

## Alternative: Hostinger VPS
If you have a **VPS Plan** on Hostinger (not Shared Hosting), you can host it directly:
1.  SSH into your VPS.
2.  Install Node.js 18+.
3.  Clone your repo: `git clone https://github.com/Acroeduvos/v0-acroeduvos-website`.
4.  Run `npm install`, `npm run build`, and `npm start`.
5.  Use Nginx to reverse proxy port 3000 to port 80.
*(This is much more complex than using Vercel. We recommend Method 1).*
