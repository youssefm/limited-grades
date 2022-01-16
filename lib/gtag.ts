export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GA_TRACKING_ENABLED = GA_TRACKING_ID !== undefined;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (GA_TRACKING_ENABLED) {
    window.gtag("config", GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: string,
  category: string,
  label: string,
  value: number
) => {
  if (GA_TRACKING_ENABLED) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
