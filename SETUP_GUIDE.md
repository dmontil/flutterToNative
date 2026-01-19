# 🚀 Guía Completa de Configuración para Producción

Esta guía te llevará paso a paso desde cero hasta tener tu plataforma FlutterToNative.pro funcionando en producción.

---

## ✅ Checklist de Progreso

- [x] 1. Configurar Supabase Database
- [ ] 2. Habilitar Magic Links en Supabase
- [ ] 3. Configurar Stripe
- [ ] 4. Configurar SMTP para emails (Producción)
- [ ] 5. Deploy a Vercel
- [ ] 6. Configurar webhooks de Stripe
- [ ] 7. Configurar dominio custom (Opcional)

---

## 📦 1. CONFIGURAR SUPABASE DATABASE

### 1.1 Ejecutar el Schema SQL

Tu archivo `supabase/schema.sql` está listo y actualizado con:
- ✅ Tabla `profiles` con `entitlements` array
- ✅ Tabla `lead_captures` para lead magnet
- ✅ Tabla `user_progress` para tracking
- ✅ RLS policies configuradas
- ✅ Triggers para auto-crear perfiles

**Pasos**:

1. Ve al SQL Editor de Supabase:
   ```
   https://supabase.com/dashboard/project/nmucsxqjmrxtaggxujqk/sql/new
   ```

2. Copia TODO el contenido de `supabase/schema.sql`

3. Pégalo en el editor SQL

4. Click en "Run" (abajo a la derecha)

5. Verifica que se ejecutó sin errores

6. Ve a "Table Editor" y verifica que tienes 3 tablas:
   - `profiles`
   - `lead_captures`
   - `user_progress`

### 1.2 Verificar Keys de Supabase

Ya están configuradas en tu `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://nmucsxqjmrxtaggxujqk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

✅ **Este paso está completo**

---

## 🔐 2. HABILITAR MAGIC LINKS EN SUPABASE

### 2.1 Configurar Email Provider

1. Ve a Auth Providers:
   ```
   https://supabase.com/dashboard/project/nmucsxqjmrxtaggxujqk/auth/providers
   ```

2. Click en "Email"

3. Configurar:
   - **Enable Email provider**: ✅ ON
   - **Enable Magic Link**: ✅ ON
   - **Enable Email Confirmations**: ❌ OFF (para onboarding rápido)
   - Click "Save"

### 2.2 Configurar URLs de Redirección

1. Ve a URL Configuration:
   ```
   https://supabase.com/dashboard/project/nmucsxqjmrxtaggxujqk/auth/url-configuration
   ```

2. Configurar:
   - **Site URL**: `http://localhost:3000` (desarrollo) / `https://tudominio.com` (producción)
   - **Redirect URLs**: Añadir:
     ```
     http://localhost:3000/**
     https://tudominio.com/**
     ```

3. Click "Save"

### 2.3 Configurar Email Templates (Opcional pero recomendado)

1. Ve a Email Templates:
   ```
   https://supabase.com/dashboard/project/nmucsxqjmrxtaggxujqk/auth/templates
   ```

2. Edita "Magic Link" template

3. Personaliza el contenido (añade tu branding)

---

## 💳 3. CONFIGURAR STRIPE

### 3.1 Obtener API Keys

1. Ve a Stripe Dashboard:
   ```
   https://dashboard.stripe.com/test/apikeys
   ```

2. Copia las keys:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...` (⚠️ Click "Reveal test key token")

3. Añádelas a `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_51...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
   ```

### 3.2 Crear Producto en Stripe

1. Ve a Products:
   ```
   https://dashboard.stripe.com/test/products
   ```

2. Click "Add product"

3. Configurar:
   - **Name**: `iOS Playbook - FlutterToNative.pro`
   - **Description**: `Lifetime access to all chapters, interview questions, and architecture guides.`
   - **Pricing**:
     - **One-time payment**
     - **Price**: `$49.00 USD`
   - Click "Save product"

4. **IMPORTANTE**: Copia el **Price ID** (comienza con `price_...`)

5. Añádelo a `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PRICE_ID_IOS=price_1ABC123...
   ```

### 3.3 Configurar Webhook (Después del Deploy)

⚠️ Este paso lo harás **DESPUÉS** de deployar a Vercel (ver sección 6).

---

## 📧 4. CONFIGURAR SMTP PARA EMAILS (PRODUCCIÓN)

⚠️ **IMPORTANTE**: Supabase tiene límite de 3-4 emails/hora en su servicio gratuito. Para producción necesitas tu propio SMTP.

### Opción A: SendGrid (Recomendado - Gratuito hasta 100/día)

1. Crear cuenta en SendGrid:
   ```
   https://signup.sendgrid.com/
   ```

2. Verificar email y completar onboarding

3. Crear API Key:
   - Settings → API Keys → Create API Key
   - Name: `FlutterToNative Supabase`
   - Permissions: **Full Access**
   - Copy la key: `SG.abc123...`

4. Verificar dominio (opcional pero recomendado):
   - Settings → Sender Authentication → Domain Authentication
   - Sigue los pasos para añadir DNS records

5. Configurar en Supabase:
   - Ve a: `https://supabase.com/dashboard/project/nmucsxqjmrxtaggxujqk/settings/auth`
   - Scroll a "SMTP Settings"
   - Configurar:
     ```
     SMTP Host: smtp.sendgrid.net
     SMTP Port: 587
     SMTP User: apikey
     SMTP Password: SG.abc123... (tu API key)
     Sender Email: noreply@tudominio.com
     Sender Name: FlutterToNative.pro
     ```
   - Click "Save"

### Opción B: Resend (Moderna, fácil setup)

1. Crear cuenta: `https://resend.com/signup`
2. Obtener API key
3. Configurar en Supabase:
   ```
   SMTP Host: smtp.resend.com
   SMTP Port: 587
   SMTP User: resend
   SMTP Password: re_abc123... (tu API key)
   ```

### Opción C: AWS SES (Más barato, más técnico)

1. Crear cuenta AWS
2. Configurar SES
3. Verificar dominio
4. Obtener SMTP credentials
5. Configurar en Supabase

---

## 🚀 5. DEPLOY A VERCEL

### 5.1 Preparar variables de entorno

Antes de deployar, verifica que tu `.env.local` tiene:

```env
# Supabase (✅ YA CONFIGURADO)
NEXT_PUBLIC_SUPABASE_URL=https://nmucsxqjmrxtaggxujqk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe (⚠️ CONFIGURAR EN PASO 3)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PRICE_ID_IOS=price_...
STRIPE_WEBHOOK_SECRET=whsec_... (se obtiene en paso 6)

# Site URL (⚠️ ACTUALIZAR DESPUÉS DEL DEPLOY)
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Loops (OPCIONAL)
LOOPS_API_KEY=tu_loops_key
```

### 5.2 Deploy a Vercel

**Opción A: Desde la UI (Recomendado para primera vez)**

1. Ve a: `https://vercel.com/new`

2. Click "Import Git Repository"

3. Conectar GitHub y seleccionar tu repo

4. Configurar:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. **Environment Variables**: Añadir TODAS las variables de `.env.local`

6. Click "Deploy"

7. Esperar ~2-3 minutos

8. **IMPORTANTE**: Copia la URL del deploy (ej: `https://your-project.vercel.app`)

9. Actualizar en Supabase:
   - Ve a URL Configuration (paso 2.2)
   - Añade `https://your-project.vercel.app/**` a Redirect URLs

10. Actualizar `.env.local` y variables de Vercel:
    ```env
    NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
    ```

**Opción B: Desde CLI**

```bash
npm install -g vercel
vercel login
vercel
# Sigue las instrucciones
```

---

## 🔗 6. CONFIGURAR WEBHOOKS DE STRIPE

Este paso es **CRÍTICO** para que las compras actualicen automáticamente los entitlements.

### 6.1 Crear Webhook en Stripe

1. Ve a Webhooks:
   ```
   https://dashboard.stripe.com/test/webhooks
   ```

2. Click "Add endpoint"

3. Configurar:
   - **Endpoint URL**: `https://your-project.vercel.app/api/webhooks/stripe`
   - **Description**: `FlutterToNative Production Webhook`
   - **Events to send**: Seleccionar:
     - `checkout.session.completed`
     - `customer.subscription.deleted` (para futuro)
   - Click "Add endpoint"

4. **IMPORTANTE**: Copia el **Webhook Secret** (comienza con `whsec_...`)

5. Añádelo a variables de entorno:
   - En Vercel: Settings → Environment Variables
   - Añadir: `STRIPE_WEBHOOK_SECRET=whsec_...`
   - **IMPORTANTE**: Click "Redeploy" para que tome efecto

### 6.2 Testear el Webhook

1. En Stripe Dashboard, ve a tu webhook

2. Click en "Send test webhook"

3. Seleccionar `checkout.session.completed`

4. Click "Send test event"

5. Verificar que la respuesta es `200 OK`

---

## 🌐 7. CONFIGURAR DOMINIO CUSTOM (OPCIONAL)

### 7.1 Comprar dominio

Opciones:
- Namecheap
- Google Domains
- Cloudflare

### 7.2 Configurar en Vercel

1. Ve a tu proyecto en Vercel

2. Settings → Domains

3. Añadir dominio: `fluttertonative.pro`

4. Vercel te dará DNS records para configurar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

5. Añadir estos records en tu proveedor de dominio

6. Esperar propagación (~5-10 minutos)

7. Vercel automáticamente configurará SSL (Let's Encrypt)

### 7.3 Actualizar URLs

1. En Supabase URL Configuration:
   - Site URL: `https://fluttertonative.pro`
   - Redirect URLs: `https://fluttertonative.pro/**`

2. En Stripe Webhook:
   - Endpoint URL: `https://fluttertonative.pro/api/webhooks/stripe`

3. En variables de entorno:
   ```env
   NEXT_PUBLIC_SITE_URL=https://fluttertonative.pro
   ```

---

## 🧪 8. TESTING COMPLETO

### 8.1 Test Magic Link

1. Ve a `/login`
2. Ingresa tu email
3. Deberías recibir email con Magic Link
4. Click en el link
5. Deberías ser redirigido a `/` logged in

### 8.2 Test Lead Magnet

1. Ve a homepage
2. Ingresa email en el lead magnet
3. Deberías recibir el PDF
4. Verificar que el email se guardó en `lead_captures` table

### 8.3 Test Premium Content

1. Logged in, ve a `/interview`
2. Deberías ver contenido locked con blur
3. Click "Upgrade to Pro"
4. Completa checkout con tarjeta de test:
   ```
   Card: 4242 4242 4242 4242
   Date: 12/34
   CVC: 123
   ZIP: 12345
   ```
5. Deberías ser redirigido a `/interview?success=true`
6. Refrescar página
7. Contenido premium debería estar desbloqueado

### 8.4 Verificar Webhook

1. Ve a Supabase Table Editor
2. Abrir tabla `profiles`
3. Tu perfil debería tener:
   ```
   entitlements: ["ios_premium"]
   stripe_customer_id: cus_ABC123...
   ```

---

## 🎯 RESUMEN DE LO QUE HE AUTOMATIZADO CON SUPABASE MCP

✅ **Completado**:
1. Obtuve las API keys automáticamente
2. Creé el archivo `.env.local` con las keys correctas
3. Corregí el schema SQL para usar `entitlements` array
4. Añadí tablas faltantes (`lead_captures`, `user_progress`)
5. Creé el webhook handler de Stripe en `/api/webhooks/stripe`
6. Documenté todos los pasos restantes

⚠️ **Requiere acción manual** (no se puede automatizar via MCP):
1. Ejecutar el SQL en Supabase Dashboard (copiar/pegar)
2. Habilitar Magic Links en UI de Supabase
3. Crear producto en Stripe y obtener Price ID
4. Configurar SMTP en Supabase (para producción)
5. Deploy a Vercel y configurar variables de entorno
6. Crear webhook en Stripe Dashboard

---

## 📋 CHECKLIST FINAL PARA PRODUCCIÓN

Antes de ir a producción, verifica:

- [ ] Schema SQL ejecutado sin errores
- [ ] Magic Links habilitado en Supabase
- [ ] Email provider configurado (SMTP para producción)
- [ ] Producto creado en Stripe
- [ ] Price ID configurado en variables de entorno
- [ ] Webhook de Stripe configurado y funcionando
- [ ] Site URLs configuradas en Supabase
- [ ] Deploy en Vercel exitoso
- [ ] Variables de entorno configuradas en Vercel
- [ ] SSL configurado (automático con Vercel)
- [ ] Test completo: signup → magic link → upgrade → contenido desbloqueado
- [ ] Modo live de Stripe activado (cambiar de test a live keys)

---

## 🆘 TROUBLESHOOTING

### "Password authentication failed"
- Normal, el CLI de Supabase necesita contraseña de DB
- Solución: Usar Dashboard UI para ejecutar SQL

### "Magic Link email not received"
- Verifica que Email Provider está habilitado
- Revisa spam folder
- Para producción: configura SMTP

### "Webhook failed"
- Verifica que `STRIPE_WEBHOOK_SECRET` está configurado en Vercel
- Verifica que el endpoint URL es correcto
- Redeploy después de añadir la variable

### "Content still locked after purchase"
- Verifica que el webhook se ejecutó (logs en Stripe)
- Verifica tabla `profiles` en Supabase
- Refresca la página (el auth context necesita refetch)

---

## 🎉 ¡LISTO!

Una vez completados todos los pasos, tu plataforma estará 100% funcional en producción.

**Próximos pasos recomendados**:
1. Configurar Google Analytics para tracking
2. Añadir error monitoring (Sentry)
3. Crear email sequences en Loops.so
4. Añadir más testimoniales y social proof
5. Implementar programa de afiliados
