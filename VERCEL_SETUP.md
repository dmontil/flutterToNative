# 🚀 Configuración de Variables de Entorno en Vercel

## Variables que necesitas configurar en Vercel

Ve a tu dashboard de Vercel > Settings > Environment Variables y añade estas variables:

### **Supabase Configuration**
```
NEXT_PUBLIC_SUPABASE_URL=https://nmucsxqjmrxtaggxujqk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_FneLa_ZAi2U4ibu9iRxwwA_wXlekHF5
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

### **Stripe Configuration**
```
STRIPE_SECRET_KEY=sk_live_***REEMPLAZA_CON_TU_CLAVE***
STRIPE_WEBHOOK_SECRET=whsec_***REEMPLAZA_CON_TU_WEBHOOK***
STRIPE_PRICE_ID_IOS_USD=price_***REEMPLAZA_CON_TU_PRICE_ID***
STRIPE_PRICE_ID_IOS_EUR=price_***REEMPLAZA_CON_TU_PRICE_ID***
STRIPE_PRICE_ID_ANDROID_USD=price_***REEMPLAZA_CON_TU_PRICE_ID***
STRIPE_PRICE_ID_ANDROID_EUR=price_***REEMPLAZA_CON_TU_PRICE_ID***
STRIPE_PRICE_ID_BUNDLE_USD=price_***REEMPLAZA_CON_TU_PRICE_ID***
STRIPE_PRICE_ID_BUNDLE_EUR=price_***REEMPLAZA_CON_TU_PRICE_ID***
```

### **Public App Config**
```
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

## 🔑 Cómo obtener las claves faltantes:

### **1. SUPABASE_SERVICE_ROLE_KEY**
- Ve a tu dashboard de Supabase
- Settings > API > service_role (secret)
- ⚠️ **IMPORTANTE**: Marca esta variable como "Sensitive" en Vercel

### **2. STRIPE_WEBHOOK_SECRET**
> **IMPORTANTE**: Si tienes múltiples dominios (ios.flutter..., android.flutter...), solo necesitas UN webhook.

1. Ve a tu dashboard de Stripe > Developers > Webhooks
2. Añade un nuevo webhook endpoint: `https://www.fluttertonative.pro/api/webhooks/stripe`
3. Selecciona los eventos: `checkout.session.completed` y `customer.subscription.deleted`
4. Copia el "Signing Secret" que empieza con `whsec_...`

**Nota**: El webhook se configura en tu dominio principal, pero funcionará para todos tus dominios (ios.flutter..., android.flutter...) porque el sistema detecta automáticamente el dominio desde donde viene el checkout.

### **3. NEXT_PUBLIC_SITE_URL**
- Para desarrollo local: `http://localhost:3000`
- Para producción: `https://tu-dominio.com` (tu dominio de Vercel)

## ✅ Resumen de Productos Configurados

### **Productos Individuales**
- **iOS Playbook**: $19.99 USD / €19.99 EUR
- **Android Playbook**: $19.99 USD / €19.99 EUR

### **Bundle**
- **Bundle (iOS + Android)**: $29.99 USD / €29.99 EUR

## 🔐 Seguridad
- `SUPABASE_SERVICE_ROLE_KEY` debe marcarse como "Sensitive" en Vercel
- `STRIPE_SECRET_KEY` debe marcarse como "Sensitive" en Vercel
- `STRIPE_WEBHOOK_SECRET` debe marcarse como "Sensitive" en Vercel

## 🔧 **Configuración para Múltiples Dominios**

Si tienes diferentes URLs para cada plataforma (ej: `ios.flutter...`, `android.flutter...`), el sistema ya está configurado para manejar esto automáticamente:

### **Características Implementadas:**
- ✅ **Detección automática de dominio**: El sistema detecta desde qué dominio viene el usuario
- ✅ **Redirección inteligente**: Después del pago, el usuario vuelve al mismo dominio donde empezó
- ✅ **Webhook único**: Solo necesitas un webhook en tu dominio principal
- ✅ **Entregas específicas**: Cada dominio puede mostrar contenido específico de su plataforma

### **Cómo Funciona:**
1. Usuario en `ios.flutter...` → Compra → Redirigido a `ios.flutter.../pricing?success=true`
2. Usuario en `android.flutter...` → Compra → Redirigido a `android.flutter.../pricing?success=true`
3. Usuario en dominio principal → Compra → Redirigido a dominio principal

### **Ejemplo de Uso de la Librería de Dominios:**
```typescript
import { getPlatformFromDomain, getCurrentDomain } from '@/lib/domain';

// Detecta automáticamente la plataforma
const platform = getPlatformFromDomain(); // 'ios' | 'android' | 'general'

// Obtiene el dominio actual
const currentDomain = getCurrentDomain(); // 'https://ios.flutter...'
```

## 🚀 Pasos siguientes:
1. Configura todas las variables en Vercel
2. Asegúrate de que el webhook de Stripe esté apuntando a tu dominio de producción
3. Haz un deploy de tu aplicación
4. Prueba el proceso de checkout completo
