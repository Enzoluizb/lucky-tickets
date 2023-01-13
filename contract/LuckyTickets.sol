// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract LuckyTickets {
    uint256 public constant ticketPrice = 0.01 ether;
    uint256 public constant ticketComission = 0.001 ether;
    uint256 public constant duration = 24 hours;

    uint256 public expiration;
    address public lotteryOperator;
    uint256 public operatorTotalComisison = 0;
    address[] public tickets;
    mapping(address => uint256) public winnings;
    address public lastWinner;
    uint256 public lastWinnerAmount;

    constructor() {
        lotteryOperator = msg.sender;
        expiration = block.timestamp + duration;
    }

    modifier isNotOperator() {
        require(
            (msg.sender != lotteryOperator),
            "caller is the loterry operator"
        );
        _;
    }

    modifier isOperator() {
        require(
            (msg.sender == lotteryOperator),
            "caller is not the loterry operator"
        );
        _;
    }

    modifier isWinner() {
        require(senderIsWinner(), "caller is not winner");
        _;
    }

    function buyTickets() public payable isNotOperator {
        require(
            msg.value % ticketPrice == 0,
            "the value must be multiple of 0.01"
        );
        uint256 numOfTicketsToBuy = msg.value / ticketPrice;
        for (uint256 i = 0; i < numOfTicketsToBuy; i++) {
            tickets.push(msg.sender);
        }
    }

    function getTickets() public view returns (address[] memory) {
        return tickets;
    }

    function getWinningsForAddress(address addr) public view returns (uint256) {
        return winnings[addr];
    }

    function senderIsWinner() public view returns (bool) {
        return winnings[msg.sender] > 0;
    }

    function drawWinnerTicket() public isOperator {
        require(tickets.length > 0, "no ticket were purchased");
        bytes32 blockHash = blockhash(block.number - tickets.length);
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, blockHash))
        );
        uint256 winningTicket = randomNumber % tickets.length;

        address winner = tickets[winningTicket];
        lastWinner = winner;
        winnings[winner] += (tickets.length * (ticketPrice - ticketComission));
        lastWinnerAmount = winnings[winner]; 
        operatorTotalComisison += (tickets.length * ticketComission);
        delete tickets;
        expiration = block.timestamp + duration;
    }

    function restartDraw() public isOperator {
        require(tickets.length == 0, "cannot restart draw as draw is in play");

        delete tickets;
        expiration = block.timestamp + duration;
    }

    function withdrawComission() public isOperator {
        address payable operator = payable(msg.sender);
        uint256 commission2Transfer = operatorTotalComisison;
        operatorTotalComisison = 0;
        operator.transfer(commission2Transfer);
    }

    function withdrawWinnings() public isWinner {
        address payable winner = payable(msg.sender);
        uint256 reward2Transfer = winnings[msg.sender];
        winnings[msg.sender] = 0;
        winner.transfer(reward2Transfer);
    }

    function currentWinningReward() public view returns (uint256) {
        return tickets.length * (ticketPrice - ticketComission);
    }
}