# 🧪 **Setup Localhost para Testing Completo**

## ✅ **El problema está resuelto en producción**
- Magic links funcionan ✅
- Cross-domain auth funciona ✅ 
- Stripe checkout funciona ✅
- Todo el flujo está operativo en https://ios.fluttertonative.pro

---

## 🔧 **Configuración para Testing Local**

### **1. Subdominios locales**

Edita `/etc/hosts` (en macOS/Linux):

```bash
sudo nano /etc/hosts
```

Agrega estas líneas:
```
127.0.0.1   fluttertonative.local
127.0.0.1   ios.fluttertonative.local
127.0.0.1   android.fluttertonative.local
```

**Guarda y cierra** (Ctrl+X, Y, Enter)

### **2. Variables de entorno locales**

Crea/actualiza tu `.env.local`:

```bash
# Supabase (mismo que producción)
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# Stripe TEST keys (NO uses las LIVE keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs de TEST (crea productos test en Stripe)
STRIPE_PRICE_ID_IOS_USD=price_test_ios_usd
STRIPE_PRICE_ID_IOS_EUR=price_test_ios_eur
STRIPE_PRICE_ID_ANDROID_USD=price_test_android_usd
STRIPE_PRICE_ID_ANDROID_EUR=price_test_android_eur
STRIPE_PRICE_ID_BUNDLE_USD=price_test_bundle_usd
STRIPE_PRICE_ID_BUNDLE_EUR=price_test_bundle_eur

# URLs locales
NEXT_PUBLIC_BASE_URL=http://fluttertonative.local:3000
NEXT_PUBLIC_SITE_URL=http://fluttertonative.local:3000
NEXT_PUBLIC_IOS_SITE_URL=http://ios.fluttertonative.local:3000
NEXT_PUBLIC_ANDROID_SITE_URL=http://android.fluttertonative.local:3000
```

### **3. Configurar Supabase para localhost**

En tu **Supabase Dashboard** → Authentication → URL Configuration, agrega:

**Site URL:**
```
http://fluttertonative.local:3000
```

**Redirect URLs:**
```
http://fluttertonative.local:3000/auth/callback
http://ios.fluttertonative.local:3000/auth/callback
http://android.fluttertonative.local:3000/auth/callback
```

### **4. Setup Stripe Test Environment**

1. **Ve a Stripe Dashboard** → Developers → Test data
2. **Crea productos de test**:
   ```
   - iOS Playbook Test → Precio $19.99 USD
   - Android Playbook Test → Precio $19.99 USD  
   - Bundle Test → Precio $29.99 USD
   ```
3. **Copia los Price IDs** y agrégalos a `.env.local`

### **5. Webhooks locales con ngrok**

```bash
# Instala ngrok si no lo tienes
brew install ngrok

# En terminal 1: Lanza tu app
npm run dev

# En terminal 2: Expone localhost con ngrok
ngrok http 3000 --host-header=localhost
```

Copia la URL HTTPS de ngrok (ej: `https://abc123.ngrok.io`)

**En Stripe Dashboard** → Webhooks → Add endpoint:
- **URL**: `https://tu-ngrok-url.ngrok.io/api/webhooks/stripe`
- **Events**: `checkout.session.completed`, `customer.subscription.deleted`

### **6. Lanzar desarrollo**

```bash
npm run dev
```

---

## 🧪 **Testing del flujo completo**

### **1. URLs de testing local:**
- **Main**: http://fluttertonative.local:3000
- **iOS**: http://ios.fluttertonative.local:3000
- **Android**: http://android.fluttertonative.local:3000
- **Login**: http://fluttertonative.local:3000/login
- **Pricing**: http://fluttertonative.local:3000/pricing

### **2. Flujo de testing:**

1. **🔐 Login**: 
   - Ve a http://fluttertonative.local:3000/login
   - Usa tu email para magic link
   - Check email y clica el magic link

2. **🛒 Compra**:
   - Ve a http://fluttertonative.local:3000/pricing
   - Clica "Get iOS Access" / "Get Android Access"
   - Usa tarjeta test: `4242 4242 4242 4242`

3. **🌐 Cross-domain**:
   - Navega entre dominios:
     - http://fluttertonative.local:3000
     - http://ios.fluttertonative.local:3000
     - http://android.fluttertonative.local:3000
   - Verifica que la sesión se mantiene

4. **🔓 Acceso premium**:
   - Ve a contenido premium en subdominios
   - Verifica que tienes acceso después de compra

---

## 🔍 **Debugging local**

### **DevTools Console logs:**
- `[CustomStorage]` - Sync de localStorage/cookies
- `[CrossDomainAuth]` - Transferencia entre dominios
- `[SessionSync]` - Estado de sesión
- `[Checkout]` - Flujo de compra

### **Troubleshooting común:**

**❌ Magic links no funcionan:**
- Check Supabase redirect URLs
- Verifica que `.env.local` tiene las URLs correctas

**❌ Subdominios no cargan:**
- Verifica `/etc/hosts`
- Reinicia browser
- Clears DNS cache: `sudo dscacheutil -flushcache`

**❌ Stripe checkout falla:**
- Verifica Price IDs de TEST en `.env.local`
- Check que usas `sk_test_` y NO `sk_live_`
- Verifica ngrok webhook

**❌ Cross-domain auth no funciona:**
- Check que cookies se están seteando correctamente
- Verifica domain en DevTools → Application → Cookies

---

## 🚀 **¡Listo para testing!**

Con este setup puedes probar **localmente** todo el flujo:
- ✅ Magic link authentication
- ✅ Cross-domain session persistence  
- ✅ Stripe checkout completo
- ✅ Premium content access
- ✅ Multi-subdomain navigation

**Todo funciona igual que en producción, pero en tu localhost.** 🎉