import { FC } from "react";

interface Props {
  label: string;
  disableInputLabel?: boolean;
}

const FilterGroup: FC<Props> = ({
  label,
  disableInputLabel = false,
  children,
}) => {
  const Wrapper = disableInputLabel ? "div" : "label";
  return (
    <Wrapper className="flex items-center lg:block">
      <div className="w-16 text-sm lg:mb-2">{label}</div>
      {children}
    </Wrapper>
  );
};

export default FilterGroup;
