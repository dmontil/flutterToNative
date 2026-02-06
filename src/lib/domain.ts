// Domain detection and configuration

export function getCurrentDomain(): string {
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fluttertonative.pro';
    }
    
    return window.location.origin;
}

export function getPlatformFromDomain(): 'ios' | 'android' | 'general' {
    if (typeof window === 'undefined') {
        return 'general';
    }
    
    const hostname = window.location.hostname;
    
    if (hostname.includes('ios.flutter') || hostname.includes('ios-native')) {
        return 'ios';
    }
    
    if (hostname.includes('android.flutter') || hostname.includes('android-native')) {
        return 'android';
    }
    
    return 'general';
}

export function getProductForCurrentDomain(): 'ios_playbook' | 'android_playbook' | null {
    const platform = getPlatformFromDomain();
    
    switch (platform) {
        case 'ios':
            return 'ios_playbook';
        case 'android':
            return 'android_playbook';
        default:
            return null;
    }
}

export function getSiteName(): string {
    const platform = getPlatformFromDomain();
    
    switch (platform) {
        case 'ios':
            return 'Flutter to iOS Playbook';
        case 'android':
            return 'Flutter to Android Playbook';
        default:
            return 'Flutter to Native Playbooks';
    }
}