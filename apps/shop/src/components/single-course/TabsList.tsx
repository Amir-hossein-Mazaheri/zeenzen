import { Tab } from '@headlessui/react';
import React from 'react';

interface TabsListProps {
  tabs: string[];
}

const TabsList: React.FC<TabsListProps> = ({ tabs }) => {
  return (
    <Tab.List className="flex items-center px-5 py-4 gap-8 bg-white shadow-mild-shadow shadow-gray-200 rounded-xl">
      {tabs.map((tab) => (
        <Tab
          className={({ selected }) =>
            `${
              selected ? 'text-light-blue font-semibold' : 'text-text-black'
            } text-base outline-none`
          }
          key={tab}
        >
          {tab}
        </Tab>
      ))}
    </Tab.List>
  );
};

export default TabsList;
