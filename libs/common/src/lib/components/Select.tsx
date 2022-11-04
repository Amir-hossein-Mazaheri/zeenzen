import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import { SelectItem, SelectOnChange } from '../types';

interface SelectProps {
  title: string;
  items: SelectItem[];
  mixTextAndValue?: boolean;
  selectedValue: SelectItem['value'];
  onChange: SelectOnChange;
  rounded?: boolean;
  minWidth?: string;
  maxWidth?: string;
}

export const Select: React.FC<SelectProps> = ({
  title,
  items,
  selectedValue,
  onChange,
  mixTextAndValue = false,
  rounded = true,
  minWidth = 'min-w-[17rem]',
  maxWidth = 'max-w-[20rem]',
}) => {
  return (
    <Listbox
      value={items.find((item) => item.value === selectedValue)?.value}
      onChange={onChange}
    >
      {({ open }) => (
        <div className="relative font-medium">
          <Listbox.Button
            className={`${
              rounded ? 'rounded-full' : 'rounded-xl'
            } ${minWidth} ${maxWidth} text-title-black flex justify-between items-center px-6 py-3 border border-gray-300`}
          >
            <span>{title}</span>
            <span>
              <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              as="ul"
              className="absolute bg-white top-full mt-2 rounded-xl shadow p-2 w-full z-10"
            >
              {items.map(({ id, text, value }) => (
                <Listbox.Option
                  className={({ active }) =>
                    `cursor-pointer text-text-black py-3 px-2 rounded-lg flex items-center gap-2 ${
                      active ? 'bg-gray-200' : ''
                    }`
                  }
                  as="li"
                  key={id}
                  value={mixTextAndValue ? `${text}///${value}` : value}
                >
                  <span className="text-sm text-gray-400">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </span>
                  <span>{text}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
