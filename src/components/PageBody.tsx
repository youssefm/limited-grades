import { FC } from "react";

import CardTable from "components/CardTable";
import FilterBar from "components/FilterBar";
import useCardTableContext from "hooks/useCardTableContext";

interface Props {
  className?: string;
}

const PageBody: FC<Props> = ({ className }) => {
  const { cardDictionary, set, showSkeletons } = useCardTableContext();

  return (
    <div className={className}>
      <FilterBar />
      <CardTable
        cardDictionary={cardDictionary}
        set={set}
        showSkeletons={showSkeletons}
      />
    </div>
  );
};

export default PageBody;
