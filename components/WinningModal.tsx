import React from "react";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";

type WinningModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function WinningModal({ isOpen, onClose }: WinningModalProps) {
  return (
    <Modal size={["xs", "sm", "md", "lg"]} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize={["sm", "md", "lg", "xl", "2xl"]}>
            Parabéns, você ganhou!
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing="6">
            <Text fontSize={["xs", "sm", "md"]}>
              Nós estamos muito felizes em dizer que você foi o sortudo
              selecionado e vai receber X BNB!
            </Text>

            <Button
              size={["xs", "sm", "md", "lg"]}
              w="100%"
              colorScheme="yellow"
              leftIcon={<FaCoins />}
            >
              Sacar X BNB
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default WinningModal;
