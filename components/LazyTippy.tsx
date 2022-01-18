// Will only render the `content` or `render` elements if the tippy is mounted to the DOM.
// Replace <Tippy /> with <LazyTippy /> component and it should work the same.
import Tippy, { TippyProps } from "@tippyjs/react";
import { useState } from "react";

export const LazyTippy = (props: TippyProps) => {
  const [mounted, setMounted] = useState(false);

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  };

  const computedProps = { ...props };

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];

  if (props.render) {
    const render = props.render;
    computedProps.render = (...args) => (mounted ? render(...args) : "");
  } else {
    computedProps.content = mounted ? props.content : "";
  }

  return <Tippy {...computedProps} />;
};
