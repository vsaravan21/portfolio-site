# DNS Setup Instructions for varshasaravanan.com

## GitHub Pages Custom Domain Setup

### Step 1: Add Custom Domain in GitHub
1. Go to: https://github.com/vsaravan21/portfolio-site/settings/pages
2. Under "Custom domain", enter: `varshasaravanan.com`
3. Check "Enforce HTTPS" (after DNS propagates)
4. Click Save

### Step 2: Configure DNS in Squarespace

#### A Records (for root domain - varshasaravanan.com)
Add these 4 A records:

1. **A Record 1:**
   - Type: A
   - Host: @ (or leave blank/root)
   - Points to: `185.199.108.153`
   - TTL: 3600 (or default)

2. **A Record 2:**
   - Type: A
   - Host: @ (or leave blank/root)
   - Points to: `185.199.109.153`
   - TTL: 3600

3. **A Record 3:**
   - Type: A
   - Host: @ (or leave blank/root)
   - Points to: `185.199.110.153`
   - TTL: 3600

4. **A Record 4:**
   - Type: A
   - Host: @ (or leave blank/root)
   - Points to: `185.199.111.153`
   - TTL: 3600

#### CNAME Record (for www.varshasaravanan.com)
- Type: CNAME
- Host: www
- Points to: `vsaravan21.github.io`
- TTL: 3600

### Step 3: Wait for DNS Propagation
- Usually takes 1-2 hours, can take up to 48 hours
- GitHub will show a green checkmark when ready
- You can check status at: https://github.com/vsaravan21/portfolio-site/settings/pages

### Step 4: Verify
- Visit: https://varshasaravanan.com
- Visit: https://www.varshasaravanan.com

Both should show your portfolio site!

## Notes
- Keep WHOIS Privacy ON (already enabled)
- Keep Domain Lock ON (already enabled)
- Auto-renew is ON (good!)

## Troubleshooting
If site doesn't load after 24 hours:
1. Check DNS propagation: https://www.whatsmydns.net/#A/varshasaravanan.com
2. Verify A records point to GitHub IPs
3. Check GitHub Pages settings show green checkmark
4. Make sure "Enforce HTTPS" is checked in GitHub
