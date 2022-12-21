// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/IHyperverseModule.sol';
import './hyperverse/Initializable.sol';
import './utils/Counters.sol';
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract CryptoBet is IHyperverseModule, Initializable {
   /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ S T A T E @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
   address public immutable contractOwner;
   address public tenantOwner;
   uint256 private entryAmount;
   uint256 private gameTime;
   uint256 private startingPrice;
   bool private started;
   bool private paused;
   bool private winnersRewarded;

    address payable[] private highBetters;
    address payable[] private lowBetters;
    address payable[] private winners;
    mapping (address => bool) public hasBetted;
    mapping (address => uint256) public addressToAmountBetted;
    enum Bet {
        HIGH, // Betters who will bet on the price being higher
        LOW // Low means users whom bet on the price being lower
    }

    AggregatorV3Interface internal priceFeed;

  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E V E N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
   event BetPlaced(address indexed better, Bet);


 
  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E R R O R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
   error UNAUTHORIZED();
   error GAME_NOT_AVAILABLE();
   error NOT_ENOUGH_ETH_TO_BET();
   error GAME_NOT_DONE();
   error WINNERS_NOT_PAID_YET();
   error WINNERS_ALREADY_PAID();
   error AlreadyInitialized();
   error NO_PRICE_DIFFERENCE();
   /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ M O D I F I E R S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
   modifier isTenantOwner() {
		if (msg.sender != tenantOwner) {
			revert UNAUTHORIZED();
		}
		_;
	}


	modifier canInitialize(address _tenant) {
		if (tenantOwner != address(0)) {
			revert AlreadyInitialized();
		}
		_;
	}

    modifier gameFinished() {
        if(block.timestamp < gameTime) {
            revert GAME_NOT_DONE();
        }
        _;
    }

    modifier gameRunning() {
        if (paused || !started || gameTime < block.timestamp) {
            revert GAME_NOT_AVAILABLE();
        }
        _;
    }

    modifier notEnough() {
        if (msg.value < entryAmount) {
            revert NOT_ENOUGH_ETH_TO_BET();
        }
        _;
    }

    modifier canWithdraw() {
        if(!winnersRewarded) {
            revert WINNERS_NOT_PAID_YET();
        }
        _;
    }

    modifier winnersPaid() {
        if(winnersRewarded) {
            revert WINNERS_ALREADY_PAID();
        }
        _;
    }

  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O N S T R U C T O R @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
   constructor(address _owner, address _oracleAddress, uint256 _entryAmount) {
       // Update metadata
       metadata = ModuleMetadata(
           'CryptoBet',
           _owner,
           '0.0.1',
           block.timestamp,
           ""
       );
        priceFeed = AggregatorV3Interface(
           _oracleAddress
        );
       contractOwner = _owner;
       entryAmount = _entryAmount;
   }
   function init(address _tenant) external initializer canInitialize(_tenant)  {
       tenantOwner = _tenant;
   }
   
  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ T E N A N T  F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
  
   function startGame(uint _setTime) external isTenantOwner {
        uint256 initialPrice = getLatestPrice();
        startingPrice = initialPrice;
        require(!started, "ALREADY_STARTED");
        started = true;
        gameTime = block.timestamp + _setTime;
    }

      function rewardWinners() external isTenantOwner gameFinished winnersPaid {
         checkPrice();
        // evaluate the amount to send to each winner;
            uint256 _amount = (address(this).balance * 90)/100;
        for (uint i = 0; i < winners.length; i++) {
            (bool sent, ) = winners[i].call{ value: _amount/winners.length}("");
            require(sent, "FAILED_TO_REWARD_WINNERS");
        }
        winnersRewarded = true;
    }

    function withdraw() external isTenantOwner canWithdraw {
        uint _amount = address(this).balance;
        (bool sent,) = tenantOwner.call{ value: _amount }("");
        require(sent, "FAILED_TO_WITHDRAW");
    }

     function setPause(bool _value) external isTenantOwner {
        paused = _value;
    }
    
    function changeEntryAmount(uint _value) external isTenantOwner {
        entryAmount = _value;
    }

  /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ F U N C T I O N S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (uint) {
        (,int price ,,,) = priceFeed.latestRoundData();
        return uint(price);
    }



    function placeBet(
        Bet _bet
        )
        external 
        payable 
        gameRunning
        notEnough
        {
        require(!hasBetted[msg.sender], "ALREADY_BETTED");
        if (_bet == Bet.HIGH) {
            address payable highBetter = payable(msg.sender);
            highBetters.push(highBetter);
        }
        else if (_bet == Bet.LOW) {
            address payable lowBetter = payable(msg.sender);
            lowBetters.push(lowBetter);
        }
        hasBetted[msg.sender] = true;
        addressToAmountBetted[msg.sender] += msg.value;
        emit BetPlaced(msg.sender, _bet);
    }

    // this function should execute automatically after the time is reached
    function checkPrice() internal {
        uint256 latestPrice = getLatestPrice();
        if(latestPrice == startingPrice) {
            gameTime = block.timestamp + 24 hours;
            revert NO_PRICE_DIFFERENCE();
        } else if (startingPrice < latestPrice) { 
            // 1200 ==> 1000 1200 < 1000 
            winners = lowBetters;
            // highBetters lose
            // lowBetters win
        } else {
            winners = highBetters;
            // highBetters win
            // lowBetters lose
        }
    }

    function returnHighBetters() external view returns (address payable[] memory) {
        return highBetters;
    }

    function returnLowBetters() external view returns (address payable[] memory) {
        return lowBetters;
    }

    function returnWinners() external view returns (address payable[] memory) {
        return winners;
    }

    function returnEntryAmount() external view returns (uint256) {
        return entryAmount;
    }

    function returnGameTime() external view returns (uint256) {
        return gameTime;
    }

    function returnStartingPrice() external view returns (uint256) {
        return startingPrice;
    }

    function haveWinnersBeenRewarded() external view returns (bool) {
        return winnersRewarded;
    }
}