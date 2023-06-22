import clsx from "clsx";
import { FC, ReactNode, useEffect, useRef } from "react";

interface Props {
  isExpanded: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
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

  const onTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>
  ): void => {
    const element = ref.current;
    if (event.target === element) {
      if (isExpanded) {
        // Remove height constraint so element can regain responsiveness
        element.style.removeProperty("maxHeight");
        element.style.removeProperty("overflow");
      } else {
        element.style.display = "none";
      }
    }
  };

  return (
    <div
      id={id}
      className={clsx("transition-[max-height]", className)}
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
