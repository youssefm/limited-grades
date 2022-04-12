export const UMAMI_SITE_ID = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;

const IS_UMAMI_ENABLED = UMAMI_SITE_ID !== undefined;

export const trackEvent = (eventValue: string) => {
  if (IS_UMAMI_ENABLED && typeof umami !== "undefined") {
    // Wait for call stack to be empty before issuing web request
    setTimeout(() => umami(eventValue));
  }
};
