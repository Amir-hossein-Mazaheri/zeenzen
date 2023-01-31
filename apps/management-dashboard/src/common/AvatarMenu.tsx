import { Menu } from '@headlessui/react';
import { Avatar } from '@zeenzen/common';
import React from 'react';

const menuItems = [];

const AvatarMenu = () => {
  return (
    <Menu>
      <Menu.Button>
        <Avatar width={33} />
      </Menu.Button>

      <Menu.Items></Menu.Items>
    </Menu>
  );
};

export default AvatarMenu;
