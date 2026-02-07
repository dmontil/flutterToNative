# 🧪 Setup Local para Testing Completo

## ✅ Deploy Exitoso
El proyecto está live en: https://ios.fluttertonative.pro

## 🔧 Configuración Local para Testing

### **Paso 1: Variables de entorno local**
Crea/actualiza tu `.env.local`:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SECRET_KEY=tu_secret_key

# Stripe (test keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# URLs
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### **Paso 2: Configurar subdominios locales**
Para simular el comportamiento cross-domain, edita `/etc/hosts`:

```bash
sudo nano /etc/hosts
```

Agrega estas líneas:
```
127.0.0.1   localhost
127.0.0.1   ios.localhost
127.0.0.1   android.localhost
127.0.0.1   fluttertonative.local
127.0.0.1   ios.fluttertonative.local
127.0.0.1   android.fluttertonative.local
```

### **Paso 3: Magic Link Testing Setup**
Para que los magic links funcionen en local:

1. **Configura Supabase redirect URLs**:
   - Ve a tu Supabase Dashboard → Authentication → URL Configuration
   - Agrega estas URLs de redirect:
     ```
     http://localhost:3000/auth/callback
     http://ios.localhost:3000/auth/callback
     http://android.localhost:3000/auth/callback
     http://fluttertonative.local:3000/auth/callback
     http://ios.fluttertonative.local:3000/auth/callback
     http://android.fluttertonative.local:3000/auth/callback
     ```

2. **Webhook local (opcional para testing completo)**:
   - Instala ngrok: `brew install ngrok`
   - En terminal: `ngrok http 3000`
   - Copia la URL HTTPS que te da ngrok
   - Ve a Stripe Dashboard → Webhooks → Add endpoint
   - URL: `https://tu-ngrok-url.ngrok.io/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`

### **Paso 4: Lanzar desarrollo**
```bash
npm run dev
```

## 🧪 **Cómo Probar el Flujo Completo**

### **1. Testing Cross-Domain Auth**
```bash
# Terminal 1: Lanza el servidor
npm run dev

# Navega en el browser:
1. http://localhost:3000/login → Haz login con magic link
2. http://ios.localhost:3000 → Verifica sesión mantenida
3. http://android.localhost:3000 → Verifica sesión mantenida
```

### **2. Testing Magic Links**
1. Ve a: http://localhost:3000/login
2. Introduce tu email
3. Check DevTools Console para logs
4. Ve a tu email y clica el magic link
5. Debe redirigir a `http://localhost:3000/auth/callback` y loguearte

### **3. Testing Completo de Compras**
```bash
# 1. Lanzar con ngrok para webhooks
ngrok http 3000

# 2. Flujo completo:
1. Login en http://localhost:3000/login
2. Go to /pricing
3. Compra con tarjeta test: 4242 4242 4242 4242
4. Stripe webhook → localhost via ngrok
5. Check entitlements en DB
6. Navega entre subdominios para verificar acceso premium
```

### **4. URLs de testing**
- **Main domain**: http://localhost:3000
- **iOS subdomain**: http://ios.localhost:3000  
- **Android subdomain**: http://android.localhost:3000
- **Login**: http://localhost:3000/login
- **Pricing**: http://localhost:3000/pricing
- **Premium content**: http://ios.localhost:3000/architecture

## 🔍 **Debugging**

### **DevTools Console logs a buscar:**
- `[CustomStorage]` - Cookie/localStorage sync
- `[CrossDomainAuth]` - Session sharing
- `[SessionSync]` - Auth state checks
- `[Middleware]` - Server-side cookie handling

### **Common issues:**
1. **Magic links no funcionan**: Check Supabase redirect URLs
2. **Cookies no se comparten**: Check `/etc/hosts` configuration  
3. **Webhooks fallan**: Check ngrok URL in Stripe dashboard
4. **Session no persiste**: Check browser storage in DevTools

### **Pro tip:**
Usa diferentes browsers/incognito para simular usuarios diferentes y test cross-domain más realísticamente.

## 🚀 **Ready to Test!**

El setup de cross-domain auth está **fixed** y ready para testing completo:
- ✅ Cookies duran 24h (vs 1h antes)
- ✅ Secure cookies en prod
- ✅ Magic links detectados automáticamente
- ✅ Sync optimizado entre dominios
- ✅ Menos page reloads innecesarios

¡Ahora puedes probar todo el flujo login → compra → acceso premium cross-domain!