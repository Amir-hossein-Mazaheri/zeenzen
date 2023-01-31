import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { AppButton } from '@zeenzen/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

interface ActionBarProps {
  title: string;
  actionName: string;
  actionLink?: string;
  actionIcon?: IconDefinition;
  actionFn?: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  title,
  actionName,
  actionLink,
  actionIcon,
  actionFn,
}) => {
  const router = useRouter();

  const handleActionClick = () => {
    if (actionLink) {
      router.push(actionLink);
    }

    if (actionFn) {
      actionFn();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-title-black">{title}</h2>
      </div>

      <div>
        <AppButton
          rounded
          onClick={handleActionClick}
          className="flex items-center gap-2"
        >
          <FontAwesomeIcon icon={actionIcon} />

          <span className="font-semibold">{actionName}</span>
        </AppButton>
      </div>
    </div>
  );
};

export default ActionBar;
