# 🧪 Guía de Modo Test para Stripe

## ✅ Productos de Test Creados

He creado todos los productos y precios en modo test automáticamente:

### **Productos de Test:**
- **iOS Playbook (TEST)**: `prod_TveykhmY4OHYH8`
- **Android Playbook (TEST)**: `prod_TvgL1E7ZcABm94`  
- **Bundle (TEST)**: `prod_TvgLFKIgChzQUr`

### **Precios de Test:**
- **iOS USD**: `price_1Sxp0bCHzUcr9ZYvIkYobWuJ` ($19.99)
- **iOS EUR**: `price_1Sxp0pCHzUcr9ZYvXk8bcsoO` (€19.99)
- **Android USD**: `price_1Sxp9cCHzUcr9ZYvJqXBbhoC` ($19.99)
- **Android EUR**: `price_1Sxp9gCHzUcr9ZYvWDlpJ1kw` (€19.99)
- **Bundle USD**: `price_1SxpA9CHzUcr9ZYv9dEAzDMz` ($29.99)
- **Bundle EUR**: `price_1SxpAOCHzUcr9ZYvfEXgPXrN` (€29.99)

## 🔧 Configuración para Testing

### **Paso 1: Actualizar tu .env.local**
Copia el contenido de `.env.test` a tu `.env.local` local para development.

### **Paso 2: Crear Webhook de Test**
1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks)
2. Asegúrate de estar en **modo test** (toggle en la esquina superior izquierda)
3. Crea un nuevo webhook: `https://www.fluttertonative.pro/api/webhooks/stripe`
4. Selecciona eventos: `checkout.session.completed`, `customer.subscription.deleted`
5. Copia el **Signing Secret** (empieza con `whsec_...`)

### **Paso 3: Actualizar Variable de Webhook**
```bash
echo "whsec_TU_SECRETO_WEBHOOK_TEST_AQUI" | vercel env add STRIPE_WEBHOOK_SECRET production
```

O actualízalo manualmente en tu `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_TU_SECRETO_WEBHOOK_TEST_AQUI
```

## 💳 Tarjetas de Prueba de Stripe

Usa estas tarjetas para testing (no necesitan datos reales):

### **Para Pagos Exitosos:**
- **Número**: `4242 4242 4242 4242`
- **Fecha**: Cualquier fecha futura
- **CVC**: Cualquier código de 3 dígitos
- **ZIP**: Cualquier código postal

### **Para Pagos Fallidos:**
- **Número**: `4000 0000 0000 0002` (tarjeta declinada)
- **Número**: `4000 0000 0000 9995` (insuficientes fondos)

## 🚀 Cómo Probar

1. **Iniciar desarrollo local:**
   ```bash
   npm run dev
   ```

2. **Ir a `/pricing`**
   - Selecciona moneda (USD/EUR)
   - Elige producto (iOS/Android/Bundle)

3. **Proceso de checkout:**
   - Te redirigirá a Stripe Checkout en modo test
   - Usa tarjeta: `4242 4242 4242 4242`
   - Completa el pago

4. **Verificar en:**
   - Dashboard de Stripe (modo test) → Payments
   - Tu base de datos Supabase → tabla `profiles`
   - Los entitlements se otorgan automáticamente

## 🔍 Verificación

Después de una compra de test, verifica:

**En Stripe Dashboard:**
- Ve a Payments y verás el pago de test
- Status: " succeeded" 

**En Supabase:**
```sql
SELECT id, email, entitlements FROM profiles WHERE email = 'tu_email';
```
Deberías ver: `ios_premium` y/o `android_premium` y/o `bundle_premium`

**En tu App:**
- Haz logout y login para refrescar los entitlements
- El contenido premium debería estar accesible

## 🔄 Cambiar entre Test y Producción

**Para Development:**
- Usa `STRIPE_SECRET_KEY=sk_test_...` en `.env.local`
- Stripe Dashboard en modo test

**Para Producción:**
- Usa `STRIPE_SECRET_KEY=sk_live_...` en Vercel
- Stripe Dashboard en modo live
- Usa los price IDs de producción (no los de test)