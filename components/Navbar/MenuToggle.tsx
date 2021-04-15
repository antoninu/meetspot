import { Box } from "@chakra-ui/react";
import CloseIcon from "public/icons/close.svg";
import MenuIcon from "public/icons/menu.svg";


const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

export default MenuToggle;
