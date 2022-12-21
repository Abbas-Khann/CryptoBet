import { HyperverseConfig } from "@decentology/hyperverse";
import { EvmLibraryBase, getProvider } from "@decentology/hyperverse-evm";
import { ethers } from "ethers";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import {
  CancellablePromise,
  pseudoCancellable,
} from "real-cancellable-promise";
import { getEnvironment } from "./environment";

export type CryptoBetLibraryType = Awaited<
  ReturnType<typeof CryptoBetLibraryInternal>
>;
export function CryptoBetLibrary(
  ...args: Parameters<typeof CryptoBetLibraryInternal>
): CancellablePromise<CryptoBetLibraryType> {
  return pseudoCancellable(CryptoBetLibraryInternal(...args));
}

export async function CryptoBetLibraryInternal(
  hyperverse: HyperverseConfig,
  providerOrSigner?: ethers.providers.Provider | ethers.Signer
) {
  const { FactoryABI, factoryAddress, ContractABI } = getEnvironment(
    hyperverse.blockchain?.name!,
    hyperverse.network
  );
  if (!providerOrSigner) {
    providerOrSigner = getProvider(hyperverse.network);
  }
  const base = await EvmLibraryBase(
    "CryptoBet",
    hyperverse,
    factoryAddress!,
    FactoryABI,
    ContractABI,
    providerOrSigner
  );

  const startGame = async ({ setTime }: { setTime: number }) => {
    try {
      const tnx = await base.proxyContract?.startGame(setTime);
      return tnx.wait() as TransactionReceipt;
    } catch (error) {
      throw error;
    }
  };

  const rewardWinners = async () => {
    try {
      const txn = await base.proxyContract?.rewardWinners();
      return txn.wait() as TransactionReceipt;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

   const withdraw = async () => {
     try {
       const withdrawTxn = await base.proxyContract?.withdraw();
       return withdrawTxn.wait() as TransactionReceipt;
     } catch (error) {
       throw error;
     }
   };

    const setPause = async ({ value }: { value: boolean }) => {
      try {
        const txn = await base.proxyContract?.setPause(value);
        return txn.wait() as TransactionReceipt;
      } catch (error) {
        throw error;
      }
    };

  const changeEntryAmount = async ({ entryAmount }: { entryAmount: number }) => {
    try {
      const entryAmountTxn = await base.proxyContract?.changeEntryAmount(entryAmount);
      return entryAmountTxn.wait() as TransactionReceipt;
    } catch (error) {
      throw error;
    }
  };

   const placeBet = async ({ bet }: { bet: number }) => {
     try {
       const betTxn = await base.proxyContract?.placeBet(bet);
       return betTxn.wait() as TransactionReceipt;
     } catch (error) {
       throw error;
     }
   };


  const getLatestPrice = async () => {
    try {
      const latestPrice = await base.proxyContract?.getLatestPrice();
      return latestPrice as number;
    } catch (error) {
      throw error;
    }
  };

  const returnHighBetters = async () => {
    try {
      const highBetters = await base.proxyContract?.returnHighBetters();
      return highBetters as string[];
    } catch (error) {
      throw error;
    }
  };

  const returnLowBetters = async () => {
    try {
      const lowBetters = await base.proxyContract?.returnLowBetters();
      return lowBetters as string[];
    } catch (error) {
      throw error;
    }
  };

  const returnWinners = async () => {
    try {
      const winners = await base.proxyContract?.returnWinners();
      return winners as string[];
    } catch (error) {
      throw error;
    }
  };

  const returnEntryAmount = async () => {
    try {
      const entryAmount = await base.proxyContract?.returnEntryAmount();
      return entryAmount as number;
    } catch (error) {
      throw error;
    }
  };

  const returnGameTime = async () => {
    try {
      const gameTime = await base.proxyContract?.returnGameTime();
      return gameTime as number;
    } catch (error) {
      throw error;
    }
  };

  const returnStartingPrice = async () => {
    try {
      const startingPrice = await base.proxyContract?.returnStartingPrice();
      return startingPrice as number;
    } catch (error) {
      throw error;
    }
  };

   const haveWinnersBeenRewarded = async () => {
     try {
       const winnersRewarded =
         await base.proxyContract?.haveWinnersBeenRewarded();
       return winnersRewarded as boolean;
     } catch (error) {
       throw error;
     }
   };


  return {
    ...base,
    startGame,
    rewardWinners,
    setPause,
    withdraw,
	changeEntryAmount,
    getLatestPrice,
    returnHighBetters,
	returnLowBetters,
	returnWinners,
	returnEntryAmount,
	returnGameTime,
	returnStartingPrice,
	haveWinnersBeenRewarded,
    placeBet
  };
}
