"use client";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const UTM_STORAGE_KEY = "ftn_attribution_v1";

export type AttributionData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  ttclid?: string;
  landing_page?: string;
  referrer?: string;
  first_seen_at?: string;
};

export function isAnalyticsEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}

export function trackPageView(path: string): void {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (!isAnalyticsEnabled() || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export function captureAttributionFromUrl(): AttributionData | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "msclkid",
    "ttclid",
  ] as const;

  const incoming: AttributionData = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) incoming[key] = value;
  }

  if (Object.keys(incoming).length === 0) return null;

  const existing = getStoredAttribution();
  const merged: AttributionData = {
    ...existing,
    ...incoming,
    landing_page: existing?.landing_page || window.location.pathname,
    referrer: existing?.referrer || document.referrer || undefined,
    first_seen_at: existing?.first_seen_at || new Date().toISOString(),
  };

  localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

export function getStoredAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AttributionData;
  } catch {
    return null;
  }
}

export function getAttributionForCheckout(): AttributionData | null {
  if (typeof window === "undefined") return null;

  return getStoredAttribution() || captureAttributionFromUrl();
}

