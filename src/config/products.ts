export type ProductId = 'ios_playbook' | 'android_playbook';

export interface ProductConfig {
    id: ProductId;
    title: string;
    description: string;
    price: number;
    stripePriceId: string;
    entitlement: string;
    themeColor: string;
    comingSoon?: boolean;
}

export const PRODUCTS: Record<ProductId, ProductConfig> = {
    'ios_playbook': {
        id: 'ios_playbook',
        title: 'Flutter to iOS Playbook',
        description: 'The definitive guide for Flutter developers to master native iOS.',
        price: 99,
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_IOS || '',
        entitlement: 'ios_premium',
        themeColor: 'indigo-500',
    },
    'android_playbook': {
        id: 'android_playbook',
        title: 'Flutter to Android Playbook',
        description: 'Bridge the gap between Flutter and modern native Android (Kotlin/Compose).',
        price: 99,
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANDROID || '',
        entitlement: 'android_premium',
        themeColor: 'green-500',
        comingSoon: true,
    }
};

export const DEFAULT_PRODUCT = PRODUCTS['ios_playbook'];
