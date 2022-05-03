// If Umami is enabled, the tracker script adds itself to window
declare namespace umami {
  function trackView(url?: string);
  function trackEvent(eventValue: string, eventType?: string, url?: string);
}
