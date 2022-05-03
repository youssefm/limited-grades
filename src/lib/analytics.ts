export const UMAMI_SITE_ID = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;
export const UMAMI_HOST_URL = process.env.NEXT_PUBLIC_UMAMI_HOST_URL;

export const IS_UMAMI_ENABLED =
  UMAMI_SITE_ID !== undefined && UMAMI_HOST_URL !== undefined;

export const trackView = (url?: string) => {
  if (IS_UMAMI_ENABLED && typeof umami !== "undefined") {
    // Wait for call stack to be empty before issuing web request
    setTimeout(() => umami.trackView(url));
  }
};

export const trackEvent = (eventValue: string) => {
  if (IS_UMAMI_ENABLED && typeof umami !== "undefined") {
    // Wait for call stack to be empty before issuing web request
    setTimeout(() => umami.trackEvent(eventValue));
  }
};
