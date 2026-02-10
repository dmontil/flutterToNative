# Custom Domain SMTP Setup: fluttertonative.pro

## Tu Situación Ideal
- ✅ Dominio propio: fluttertonative.pro
- ✅ Proton Mail como gestor
- ✅ Quieres emails profesionales: admin@fluttertonative.pro

## Opción 1: Proton Mail Business (Más Fácil)
### Verificar si Proton soporta SMTP:
1. Login a Proton Mail
2. Settings > Domain settings
3. Buscar "SMTP" o "API access"
4. Si está disponible, obtendrás:
   - Host: bridge.protonmail.com (o similar)
   - Port: 587
   - Username: tu-email@fluttertonative.pro
   - Password: app-specific password

## Opción 2: AWS SES con tu Dominio (Recomendada)
### Ventajas:
- $0.10 per 1,000 emails
- Excelente deliverability
- Funciona con cualquier dominio
- 62,000 emails gratis al mes (con AWS Free Tier)

### Setup:
1. **AWS Console > SES**
2. **Verify Domain**: fluttertonative.pro
3. **Add DNS Records** (en tu proveedor de dominio):
   ```
   Type: TXT
   Name: _amazonses.fluttertonative.pro
   Value: [AWS te dará este valor]
   ```
4. **Get SMTP Credentials**:
   - Host: email-smtp.us-east-1.amazonaws.com
   - Port: 587
   - Username: [AWS generated]
   - Password: [AWS generated]

## Opción 3: Mailgun con tu Dominio
### Setup Fácil:
1. Sign up: mailgun.com
2. Add domain: fluttertonative.pro
3. Add DNS records
4. Get SMTP settings

### Pricing:
- 1,000 emails/month gratis
- Luego $0.80 per 1,000 emails

## Configuración en Supabase
Una vez que tengas las credenciales:

1. **Supabase Dashboard**
2. **Project Settings > Auth**
3. **Email Templates**
4. **Enable Custom SMTP**
5. **Add settings**:
   ```
   Host: [tu host SMTP]
   Port: 587
   Username: admin@fluttertonative.pro
   Password: [tu password]
   From Email: noreply@fluttertonative.pro
   ```

## Recomendación
1. **Primero**: Verifica si Proton Business tiene SMTP
2. **Si no**: Usar AWS SES (más económico y confiable)
3. **Alternativa**: Mailgun (más fácil de configurar)

## Emails Resultantes
- Login: `noreply@fluttertonative.pro`
- Password Reset: `noreply@fluttertonative.pro`
- Confirmations: `admin@fluttertonative.pro`

**¡Mucho más profesional que SendGrid!**