import React from 'react';
import { Badge } from '@zeenzen/common';

import { CategoryFilter, LevelFilter } from '../types';

interface FilterListProps {
  filters: (CategoryFilter | LevelFilter)[];
  onEachFilterClose?: (filter: CategoryFilter | LevelFilter) => void;
  onClearAllFilters?: () => void;
}

const FilterList: React.FC<FilterListProps> = ({
  onClearAllFilters,
  onEachFilterClose,
  filters,
}) => {
  if (filters.length === 0) {
    return <></>;
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-5 items-center">
        {filters.map((filter) => (
          <Badge
            hasClose
            key={filter.text}
            text={filter.text}
            onClose={() => onEachFilterClose && onEachFilterClose(filter)}
          />
        ))}
      </div>
      <Badge hasClose text="حذف همه فیلتر ها" onClose={onClearAllFilters} />
    </div>
  );
};

export default FilterList;
