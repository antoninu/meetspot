import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';


const NavBarContainer = ({ children }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={3}
      px={10}
      bg="primary.500"
      position="fixed"
      zIndex={999}
    >
      {children}
    </Flex>
  );
};

export default NavBarContainer;
