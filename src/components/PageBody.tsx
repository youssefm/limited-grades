import { FC } from "react";

import CardTable from "components/CardTable";
import FilterBar from "components/FilterBar";
import useCardTableContext from "hooks/useCardTableContext";

const PageBody: FC = () => {
  const { cardDictionary, set, showSkeletons } = useCardTableContext();

  return (
    <div>
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
