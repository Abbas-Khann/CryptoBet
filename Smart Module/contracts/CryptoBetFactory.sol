// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './hyperverse/IHyperverseModule.sol';
// Import smart contract
import './CryptoBet.sol';

/**
* @dev Clone Factory Implementation
*/

// Update occurrences of module name
contract CryptoBetFactory is CloneFactory {
   using Counters for Counters.Counter;
   struct Tenant {
       CryptoBet cryptoBet;
       address owner;
   }


   Counters.Counter public tenantCounter;
   mapping(address => Tenant) public tenants;
   address public immutable owner;
   address public immutable masterContract;


    constructor(address _masterContract, address _owner) {
        masterContract = _masterContract;
        owner = _owner;
    }

    /******************* TENANT FUNCTIONALITIES *******************/

    function createInstance(address _tenant) external {
        // Update module name
        CryptoBet cryptoBet = CryptoBet(createClone(masterContract));

        //initializing tenant state of clone
        cryptoBet.init(msg.sender);

        //set Tenant data
        Tenant storage newTenant = tenants[_tenant];
        // Update occurrences of module name
        newTenant.cryptoBet = cryptoBet;
        newTenant.owner = _tenant;
        tenantCounter.increment();
    }

    function getProxy(address _tenant) public view returns (CryptoBet) {
        return tenants[_tenant].cryptoBet;
    }
}