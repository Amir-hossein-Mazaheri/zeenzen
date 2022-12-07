import React, { useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { AccordionItem } from '../types';

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  accordionStyle?: 'one-at-time' | 'many-at-time';
  onEachItemClick?: (item: AccordionItem) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  items: accordionItems,
  className,
  onEachItemClick,
  accordionStyle = 'many-at-time',
}) => {
  const [items, setItems] = useState<AccordionItem[]>(accordionItems);

  const handleClose = (id: AccordionItem['id']) => {
    setItems((currItems) => {
      if (accordionStyle === 'one-at-time') {
        return currItems.map((item) => ({
          ...item,
          isOpen: !item.isOpen && item.id === id,
        }));
      }

      const copyItems = [...currItems];
      const itemIndex = currItems.findIndex((item) => item.id === id);
      const item = copyItems[itemIndex];

      if (item.isOpen) {
        item.isOpen = false;
      } else {
        item.isOpen = true;
      }

      return copyItems;
    });

    if (onEachItemClick) {
      const item = items.find((item) => item.id === id);

      if (!item) {
        throw new Error('invalid item id in Accordion.');
      }

      onEachItemClick(item);
    }
  };

  return (
    <div className={`w-full space-y-5 ${className}`}>
      {items.map(({ id, title, content, isOpen }) => (
        <Disclosure key={id} defaultOpen={isOpen}>
          <Disclosure.Button
            onClick={() => handleClose(id)}
            className={`${
              isOpen ? 'bg-light-blue/10 text-light-blue' : 'bg-white'
            } font-semibold shadow-mild-shadow shadow-gray-200/40 flex w-full items-center justify-between rounded-xl md:px-7 md:py-5 py-4 px-5 text-sm md:text-base transition-all duration-300`}
          >
            <span>{title}</span>

            <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
          </Disclosure.Button>

          <Transition
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel
              className="md:px-8 md:py-4 px-6 py-3 text-sm md:text-base leading-loose"
              static
            >
              {content}
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      ))}
    </div>
  );
};

export default Accordion;
