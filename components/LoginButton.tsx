import React, { useState } from "react";
import { Button, IconButton, useMediaQuery } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaWallet } from "react-icons/fa";
import { useDisconnect } from "@thirdweb-dev/react";

type LoginButtonProps = {
  address: string | undefined;
  onOpen: () => void;
};

function LoginButton({ address, onOpen }: LoginButtonProps) {
  const [hover, setHover] = useState(false);
  const [isLargerThan780] = useMediaQuery("(min-width: 780px)");
  const disconnect = useDisconnect();

  if (isLargerThan780) {
    if (address) {
      return (
        <Button
          size={["sm", "md", "lg"]}
          leftIcon={hover ? <FaArrowLeft /> : <FaWallet />}
          w="200px"
          ml={["2", "2", "4", "4"]}
          colorScheme="yellow"
          onClick={disconnect}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover
            ? "Clique para sair"
            : `${address.substring(0, 5)}...${address.substring(
                address.length,
                address.length - 5
              )}`}
        </Button>
      );
    }
    return (
      <Button
        size={["sm", "md", "lg"]}
        leftIcon={<FaArrowRight />}
        w="200px"
        ml={["2", "2", "4", "4"]}
        colorScheme="yellow"
        onClick={onOpen}
      >
        Entrar
      </Button>
    );
  } else {
    if (address) {
      return (
        <IconButton
          ariel-label="Logout"
          colorScheme="yellow"
          ml={["2", "2", "4", "4"]}
          icon={<FaWallet />}
          onClick={disconnect}
          size={["sm", "md", "lg"]}
        />
      );
    }
    return (
      <IconButton
        ariel-label="Login"
        colorScheme="yellow"
        ml={["2", "2", "4", "4"]}
        icon={<FaArrowRight />}
        onClick={onOpen}
        size={["sm", "md", "lg"]}
      />
    );
  }
}

export default LoginButton;
