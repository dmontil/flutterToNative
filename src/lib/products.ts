// Product configuration types
export type ProductId = 'ios_playbook' | 'android_playbook' | 'bundle_playbook';
export type Currency = 'USD' | 'EUR';

export interface ProductConfig {
  id: ProductId;
  name: string;
  description: string;
  prices: {
    USD: string;
    EUR: string;
  };
  entitlements: string[];
  amount: {
    USD: number;
    EUR: number;
  };
}

// Product configuration mapping
export const PRODUCTS: Record<ProductId, ProductConfig> = {
  ios_playbook: {
    id: 'ios_playbook',
    name: 'Flutter to iOS Playbook',
    description: 'Guía interactiva completa para migrar tu app Flutter a iOS nativo',
    prices: {
      USD: process.env.STRIPE_PRICE_ID_IOS_USD?.trim() || '',
      EUR: process.env.STRIPE_PRICE_ID_IOS_EUR?.trim() || '',
    },
    entitlements: ['ios_premium'],
    amount: {
      USD: 1999, // $19.99
      EUR: 1999, // €19.99
    },
  },
  android_playbook: {
    id: 'android_playbook',
    name: 'Flutter to Android Playbook',
    description: 'Guía interactiva completa para migrar tu app Flutter a Android nativo',
    prices: {
      USD: process.env.STRIPE_PRICE_ID_ANDROID_USD?.trim() || '',
      EUR: process.env.STRIPE_PRICE_ID_ANDROID_EUR?.trim() || '',
    },
    entitlements: ['android_premium'],
    amount: {
      USD: 1999, // $19.99
      EUR: 1999, // €19.99
    },
  },
  bundle_playbook: {
    id: 'bundle_playbook',
    name: 'Flutter Playbook Bundle (iOS + Android)',
    description: 'Ambos playbooks con descuento especial - Mejor valor',
    prices: {
      USD: process.env.STRIPE_PRICE_ID_BUNDLE_USD?.trim() || '',
      EUR: process.env.STRIPE_PRICE_ID_BUNDLE_EUR?.trim() || '',
    },
    entitlements: ['ios_premium', 'android_premium', 'bundle_premium'],
    amount: {
      USD: 2999, // $29.99
      EUR: 2999, // €29.99
    },
  },
};

// Helper function to get price ID for product and currency
export function getPriceId(productId: ProductId, currency: Currency = 'USD'): string {
  const priceId = PRODUCTS[productId].prices[currency];
  console.log('[getPriceId]', { productId, currency, priceId, allPrices: PRODUCTS[productId].prices });
  return priceId;
}

// Helper function to get entitlements for product
export function getEntitlements(productId: ProductId): string[] {
  return PRODUCTS[productId].entitlements;
}

// Helper function to format price
export function formatPrice(amount: number, currency: Currency): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(amount / 100); // Convert cents to dollars/euros
}

// Get product info
export function getProduct(productId: ProductId): ProductConfig {
  return PRODUCTS[productId];
}