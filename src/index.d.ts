// If Umami is enabled, the tracker script adds itself to window
declare namespace umami {
  type TrackedProperties = {
    hostname: string;
    language: string;
    referrer: string;
    screen: string;
    title: string;
    url: string;
    website: string;
  };

  function track();
  function track(eventName: string);
  function track(event: (props: TrackedProperties) => TrackedProperties);
}
