import { FC } from "react";

import CardTable from "components/CardTable";
import FilterBar from "components/FilterBar";
import useCardTableContext from "hooks/useCardTableContext";

const PageBody: FC = () => {
  const { cardDictionary, showSkeletons } = useCardTableContext();

  return (
    <div className="grow">
      <FilterBar />
      <CardTable
        cardDictionary={cardDictionary}
        showSkeletons={showSkeletons}
      />
    </div>
  );
};

export default PageBody;
