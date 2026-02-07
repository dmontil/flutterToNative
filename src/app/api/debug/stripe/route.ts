import { NextResponse } from "next/server";

export async function GET() {
    const debug = {
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 10),
        hasIosUsd: !!process.env.STRIPE_PRICE_ID_IOS_USD,
        iosUsdPrefix: process.env.STRIPE_PRICE_ID_IOS_USD?.substring(0, 10),
        hasIosEur: !!process.env.STRIPE_PRICE_ID_IOS_EUR,
        iosEurPrefix: process.env.STRIPE_PRICE_ID_IOS_EUR?.substring(0, 10),
        hasAndroidUsd: !!process.env.STRIPE_PRICE_ID_ANDROID_USD,
        androidUsdPrefix: process.env.STRIPE_PRICE_ID_ANDROID_USD?.substring(0, 10),
        hasAndroidEur: !!process.env.STRIPE_PRICE_ID_ANDROID_EUR,
        androidEurPrefix: process.env.STRIPE_PRICE_ID_ANDROID_EUR?.substring(0, 10),
        hasBundleUsd: !!process.env.STRIPE_PRICE_ID_BUNDLE_USD,
        bundleUsdPrefix: process.env.STRIPE_PRICE_ID_BUNDLE_USD?.substring(0, 10),
        hasBundleEur: !!process.env.STRIPE_PRICE_ID_BUNDLE_EUR,
        bundleEurPrefix: process.env.STRIPE_PRICE_ID_BUNDLE_EUR?.substring(0, 10),
        allStripeVars: Object.keys(process.env).filter(k => k.includes('STRIPE'))
    };

    return NextResponse.json(debug);
}