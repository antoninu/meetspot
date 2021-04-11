import React, { useState } from 'react';
import { Divider } from '@chakra-ui/react';
import Logo from './Logo';
import MenuToggle from 'components/Navbar/MenuToggle';
import MenuLinks from 'components/Navbar/MenuLinks';
import NavBarContainer from 'components/Navbar/NavBarContainer';

type Props = {
  privateRoute?: boolean;
};

const NavBar = ({ privateRoute }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer>
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} privateRoute={privateRoute} />
      <Divider />
    </NavBarContainer>
  );
};

export default NavBar;
