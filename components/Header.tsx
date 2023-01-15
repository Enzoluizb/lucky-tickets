import React, { useEffect } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import AdminsControl from "./AdminsControl";
import LoginButton from "./LoginButton";
import LoginModal from "./LoginModal";
import Logo from "./Logo";
import TicketsButton from "./TicketsButton";
import { useAddress } from "@thirdweb-dev/react";
import WinningModal from "./WinningModal";

function Header() {
  const address = useAddress()
  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal
  } = useDisclosure();
  const {
    isOpen: isOpenWinningModal,
    onOpen: onOpenWinningModal,
    onClose: onCloseWinningModal
  } = useDisclosure();

  useEffect (() => {
    if (address) {
      onCloseLoginModal()
    }
  }, [address])

  return (
    <Flex
      h="100px"
      w="100%"
      bg="blackAlpha.900"
      align="center"
      justify="space-between"
      px={["4", "8", "26", "32", "60", "60"]}
      borderBottom="2px"
      borderColor="gray.900"
    >
      <Logo />
      <Flex>
        <AdminsControl />
        <TicketsButton onOpenWinningModal={onOpenWinningModal}/>
        <LoginButton address={address} onOpen={onOpenLoginModal} />
      </Flex>
      <LoginModal isOpen={isOpenLoginModal} onClose={onCloseLoginModal}/>
      <WinningModal isOpen={isOpenWinningModal} onClose={onCloseWinningModal}/>
    </Flex>
  );
}

export default Header;
