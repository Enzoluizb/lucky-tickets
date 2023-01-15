import React from "react";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

function AdminsControl() {
  const [isLargeThan1650] = useMediaQuery("(min-width: 1650px)");
  return (
    <HStack>
      {isLargeThan1650 ? (
        <>
          <Button>Sacar x BNB</Button>
          <Button>Sortear ganhador</Button>
          <Button>Reiniciar sorteio</Button>
        </>
      ) : (
        <Menu>
          <MenuButton
            as={Button}
            size={["sm", "md", "lg"]}
            rightIcon={<FaChevronDown />}
          >
            Ações
          </MenuButton>
          <MenuList>
            <MenuItem>Sacar x BNB</MenuItem>
            <MenuItem>Sortear ganhador</MenuItem>
            <MenuItem>Reiniciar sorteio</MenuItem>
          </MenuList>
        </Menu>
      )}
    </HStack>
  );
}

export default AdminsControl;
