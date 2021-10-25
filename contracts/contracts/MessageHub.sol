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

    event NewMessage(string name, string email, string message);

    function sendMessage(Message memory _newMessage) external {
        require(keccak256(abi.encodePacked(_newMessage.fax)) == keccak256(""), "Error: Message could not be sent");
        emit NewMessage(_newMessage.name, _newMessage.email, _newMessage.message);
    }
}