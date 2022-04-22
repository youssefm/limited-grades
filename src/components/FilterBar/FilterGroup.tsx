import clsx from "clsx";
import { FC } from "react";

interface Props {
  label: string;
  disableInputLabel?: boolean;
  className?: string;
}

const FilterGroup: FC<Props> = ({
  label,
  disableInputLabel = false,
  className,
  children,
}) => {
  const Wrapper = disableInputLabel ? "div" : "label";
  return (
    <Wrapper className={clsx("flex items-center lg:block", className)}>
      <div className="w-16 text-sm select-none lg:mb-2">{label}</div>
      <div className="grow">{children}</div>
    </Wrapper>
  );
};

export default FilterGroup;
