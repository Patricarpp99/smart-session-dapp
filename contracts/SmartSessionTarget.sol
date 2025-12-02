// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SmartSessionTarget {
    uint256 private _number;

    event NumberUpdated(uint256 newValue, address executor);

    function store(uint256 newNumber) external {
        _number = newNumber;
        emit NumberUpdated(newNumber, msg.sender);
    }

    function get() external view returns (uint256) {
        return _number;
    }
}