import clsx from "clsx";
import { FC, useEffect, useRef } from "react";

interface Props {
  isExpanded: boolean;
  id?: string;
  className?: string;
}

const Collapsible: FC<Props> = ({ isExpanded, id, className, children }) => {
  const isMounted = useRef(false);
  const pendingFirstExpansion = useRef(!isExpanded);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      if (isMounted.current) {
        if (isExpanded) {
          element.style.removeProperty("display");
          element.style.maxHeight = `${element.scrollHeight}px`;
          pendingFirstExpansion.current = false;
        } else {
          element.style.maxHeight = `${element.scrollHeight}px`;
          // Force the browser to render the element by reading the scrollHeight
          // We need maxHeight to be applied in the DOM for the transition to work
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          element.scrollHeight;
          element.style.overflow = "hidden";
          element.style.maxHeight = "0";
        }
      } else {
        isMounted.current = true;
      }
    }
  }, [isExpanded]);

  const onTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target === ref.current) {
      if (isExpanded) {
        // Remove height constraint so element can regain responsiveness
        ref.current.style.removeProperty("maxHeight");
        ref.current.style.removeProperty("overflow");
      } else {
        ref.current.style.display = "none";
      }
    }
  };

  return (
    <div
      id={id}
      className={clsx("transition-max-h ease-[ease]", className)}
      style={
        pendingFirstExpansion.current
          ? { maxHeight: 0, overflow: "hidden", display: "none" }
          : undefined
      }
      onTransitionEnd={onTransitionEnd}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Collapsible;
