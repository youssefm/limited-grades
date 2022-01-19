import Tippy, { TippyProps } from "@tippyjs/react";
import { forwardRef, useState } from "react";

// Adapted from https://gist.github.com/atomiks/520f4b0c7b537202a23a3059d4eec908

// Will only render the `content` or `render` elements if the tippy is mounted to the DOM.
// Replace <Tippy /> with <LazyTippy /> component and it should work the same.

const LazyTippy = forwardRef<Element, TippyProps>((props, ref) => {
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
    computedProps.render = (...args) => (mounted ? props.render!(...args) : "");
  } else {
    computedProps.content = mounted ? props.content : "";
  }

  return <Tippy {...computedProps} ref={ref} />;
});

LazyTippy.displayName = "LazyTippy";

export default LazyTippy;
