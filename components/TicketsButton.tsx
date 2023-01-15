import React from "react";
import { Button, useMediaQuery } from "@chakra-ui/react";
import { FaCoins, FaTicketAlt } from "react-icons/fa";

type TicketsButtonProps = {
  onOpenWinningModal: () => void
};

function TicketsButton({onOpenWinningModal} : TicketsButtonProps) {
  const [isLargerThan780] = useMediaQuery("(min-width: 780px)")
  const winnings = 0.5;
  const buttonText = isLargerThan780 ? `Sacar ${winnings} BNB` : "Sacar"
  return (
    <Button
      size={["sm", "md", "lg"]}
      leftIcon={winnings > 0 ?<FaCoins /> : <FaTicketAlt/>}
      colorScheme="yellow"
      onClick={winnings ? onOpenWinningModal : () => {}}
    >
      {winnings > 0 ? buttonText : 10}
    </Button>
  );
}

export default TicketsButton;
