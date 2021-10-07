// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MessageHub is Ownable {
    struct Message {
        string name;
        string email;
        string message;
        string fax;
    }

    event NewMessage(Message);

    function sendMessage(Message memory _newMessage) external returns (bool) {
        if (keccak256(abi.encodePacked(_newMessage.fax)) == keccak256("")) {
            return false;
        }

        emit NewMessage(_newMessage);
        return true;
    }
}