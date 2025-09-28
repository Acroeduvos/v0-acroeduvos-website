# 🌐 DNS TTL Configuration for acroeduvos.in

## 📋 What is DNS TTL?

**TTL (Time To Live)** is a DNS setting that determines how long DNS records are cached by:
- Internet Service Providers (ISPs)
- DNS servers
- Web browsers
- CDNs

**Lower TTL = Faster propagation, Higher TTL = Better performance**

## ⚙️ Recommended TTL Settings for Vercel Deployment

### **Before Deployment (Low TTL)**
```
Type: A
Name: @
Value: 76.76.19.61
TTL: 300 (5 minutes)

Type: A
Name: www
Value: 76.76.19.61
TTL: 300 (5 minutes)

Type: CNAME
Name: cname
Value: cname.vercel-dns.com
TTL: 300 (5 minutes)
```

### **After Deployment (Production TTL)**
```
Type: A
Name: @
Value: 76.76.19.61
TTL: 3600 (1 hour)

Type: A
Name: www
Value: 76.76.19.61
TTL: 3600 (1 hour)

Type: CNAME
Name: cname
Value: cname.vercel-dns.com
TTL: 3600 (1 hour)
```

## 🎯 TTL Best Practices

### **For Initial Setup:**
- **TTL: 300 seconds (5 minutes)**
- **Reason**: Faster propagation during setup
- **Use Case**: When changing DNS records

### **For Production:**
- **TTL: 3600 seconds (1 hour)**
- **Reason**: Good balance of performance and flexibility
- **Use Case**: Stable production environment

### **For High Traffic Sites:**
- **TTL: 86400 seconds (24 hours)**
- **Reason**: Maximum caching for performance
- **Use Case**: Rarely changed DNS records

## 🔧 How to Set DNS TTL

### **Step 1: Access Your DNS Provider**
Common DNS providers:
- **Cloudflare**: cloudflare.com
- **GoDaddy**: godaddy.com
- **Namecheap**: namecheap.com
- **Route 53 (AWS)**: aws.amazon.com/route53
- **Google Cloud DNS**: cloud.google.com/dns

### **Step 2: Find DNS Management**
1. Login to your domain provider
2. Go to **"DNS Management"** or **"Domain Settings"**
3. Look for **"A Records"** and **"CNAME Records"**

### **Step 3: Update TTL Settings**
1. **Edit existing records** or **Add new records**
2. **Set TTL value** (usually in seconds)
3. **Save changes**

## 📊 TTL Values Reference

| TTL Value | Duration | Use Case |
|-----------|----------|----------|
| 60 | 1 minute | Emergency changes |
| 300 | 5 minutes | Initial setup |
| 900 | 15 minutes | Testing changes |
| 3600 | 1 hour | Production (recommended) |
| 7200 | 2 hours | Stable production |
| 86400 | 24 hours | High traffic sites |

## ⚡ Quick Setup for acroeduvos.in

### **Immediate Setup (Fast Propagation):**
```
@ (root domain):
Type: A
Value: 76.76.19.61
TTL: 300

www (subdomain):
Type: A
Value: 76.76.19.61
TTL: 300

cname:
Type: CNAME
Value: cname.vercel-dns.com
TTL: 300
```

### **After 24 Hours (Optimize for Performance):**
```
@ (root domain):
Type: A
Value: 76.76.19.61
TTL: 3600

www (subdomain):
Type: A
Value: 76.76.19.61
TTL: 3600

cname:
Type: CNAME
Value: cname.vercel-dns.com
TTL: 3600
```

## 🔍 How to Check DNS Propagation

### **Online Tools:**
- **whatsmydns.net**: Check global DNS propagation
- **dnschecker.org**: Real-time DNS lookup
- **mxtoolbox.com**: Comprehensive DNS tools

### **Command Line:**
```bash
# Check DNS resolution
nslookup acroeduvos.in

# Check with specific DNS server
nslookup acroeduvos.in 8.8.8.8

# Check TTL value
dig acroeduvos.in
```

## ⚠️ Important Notes

### **DNS Propagation Timeline:**
- **Immediate**: Changes appear in your DNS provider
- **5-30 minutes**: Most DNS servers updated
- **Up to 48 hours**: Full global propagation (rare)

### **TTL Considerations:**
- **Lower TTL**: Faster changes, more DNS queries
- **Higher TTL**: Slower changes, better performance
- **Balance**: 1 hour (3600) is usually optimal

### **Vercel Specific:**
- **Automatic SSL**: Vercel handles HTTPS certificates
- **Edge Network**: Global CDN for fast loading
- **Custom Domains**: Free with Vercel Pro plan

## 🚀 Recommended Action Plan

### **Phase 1: Initial Setup (Now)**
1. Set TTL to **300 seconds (5 minutes)**
2. Add DNS records for acroeduvos.in
3. Deploy to Vercel
4. Test domain connection

### **Phase 2: Optimization (After 24 hours)**
1. Change TTL to **3600 seconds (1 hour)**
2. Monitor performance
3. Verify SSL certificate is active

### **Phase 3: Production (After 1 week)**
1. Consider TTL of **86400 seconds (24 hours)**
2. Monitor traffic and performance
3. Fine-tune based on usage patterns

## 📞 Support

If you need help with DNS configuration:
- **Vercel Support**: https://vercel.com/help
- **Domain Provider Support**: Check your registrar's help center
- **DNS Tools**: Use online DNS checkers for troubleshooting

---

**Quick Summary**: Start with TTL 300 for fast setup, then change to TTL 3600 for production! 🚀
