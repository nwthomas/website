// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MessageHub is Ownable {
    struct Message {
        string name;
        string email;
        string message;
        string fax;
    }

    event NewMessage(string name, string email, string message);

    /**
     * @notice Allows the sending of a new message through the use of the EVM
     * @param _newMessage The new message to be sent via an event. Fields include:
     *   - name
     *   - email
     *   - message
     *   - fax
     * @dev The fax field is a honeypot field and thus reverts the entire function if present
     */
    function sendMessage(Message memory _newMessage) external {
        require(keccak256(abi.encodePacked(_newMessage.fax)) == keccak256(""), "Error: Message could not be sent");
        emit NewMessage(_newMessage.name, _newMessage.email, _newMessage.message);
    }
}