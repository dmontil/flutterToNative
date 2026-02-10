#!/bin/bash

# Setup local domains for FlutterToNative development
echo "🔧 Setting up local domains for development..."

# Check if running as root (needed for /etc/hosts)
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script needs sudo permissions to modify /etc/hosts"
    echo "   Run: sudo ./setup-local-domains.sh"
    exit 1
fi

# Backup original hosts file
cp /etc/hosts /etc/hosts.backup.$(date +%Y%m%d_%H%M%S)
echo "✅ Backed up original /etc/hosts"

# Add local domains
echo "" >> /etc/hosts
echo "# FlutterToNative local development domains" >> /etc/hosts
echo "127.0.0.1   fluttertonative.local" >> /etc/hosts
echo "127.0.0.1   ios.fluttertonative.local" >> /etc/hosts
echo "127.0.0.1   android.fluttertonative.local" >> /etc/hosts

echo "✅ Added local domains to /etc/hosts:"
echo "   - fluttertonative.local"
echo "   - ios.fluttertonative.local" 
echo "   - android.fluttertonative.local"

# Flush DNS cache on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    dscacheutil -flushcache
    echo "✅ Flushed DNS cache"
fi

echo ""
echo "🎉 Local domains configured successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Update your .env.local with the URLs from LOCALHOST_SETUP.md"
echo "   2. Configure Supabase redirect URLs"
echo "   3. Set up Stripe test products and webhooks"
echo "   4. Run: npm run dev"
echo "   5. Visit: http://fluttertonative.local:3000"
echo ""
echo "📖 Full instructions: LOCALHOST_SETUP.md"