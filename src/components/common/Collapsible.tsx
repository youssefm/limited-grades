import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";

interface Props {
  isExpanded: boolean;
  id?: string;
  className?: string;
}

const Collapsible: FC<Props> = ({ isExpanded, id, className, children }) => {
  const [isElementExpanded, setIsElementExpanded] = useState(isExpanded);
  const [height, setHeight] = useState<number | undefined>(
    isExpanded ? undefined : 0
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      if (isExpanded && !isElementExpanded) {
        setHeight(element.scrollHeight);
      }
      if (!isExpanded && isElementExpanded) {
        element.style.maxHeight = `${element.scrollHeight}px`;
        // Force the browser to render the element by reading the scrollHeight
        // We need maxHeight to be applied in the DOM for the transition to work
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        element.scrollHeight;
        setHeight(0);
      }
    }
    setIsElementExpanded(isExpanded);
  }, [isElementExpanded, isExpanded]);

  const onTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target === ref.current && isExpanded) {
      // Remove height constraint so element can regain responsiveness
      setHeight(undefined);
    }
  };

  return (
    <div
      id={id}
      className={clsx(
        "overflow-hidden transition-max-h ease-[ease]",
        className
      )}
      style={{ maxHeight: height }}
      onTransitionEnd={onTransitionEnd}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Collapsible;
