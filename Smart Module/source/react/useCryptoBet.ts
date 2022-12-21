import { useState, useEffect, useCallback } from "react";
import { createContainer, useContainer } from "@decentology/unstated-next";
import { useHyperverse } from "@decentology/hyperverse/react";
import { useEvm } from "@decentology/hyperverse-evm/react";
import { CryptoBetLibrary, CryptoBetLibraryType } from "../cryptoBetLibrary";
import { useEventListener } from "./useEventListener";

function CryptoBetState(
  initialState: { tenantId: string } = {
    tenantId: "",
  }
) {
  const { tenantId } = initialState;
  const { signer, readOnlyProvider } = useEvm();
  const hyperverse = useHyperverse();
  const [cryptoBetLibrary, setCryptoBetLibrary] =
    useState<CryptoBetLibraryType>();

  useEffect(() => {
    const lib = CryptoBetLibrary(hyperverse, signer || readOnlyProvider)
      .then(setCryptoBetLibrary)
      .catch((x) => {
        // Ignoring stale library instance
      });

    return lib.cancel;
  }, [signer, readOnlyProvider]);

  const useCryptoBetEvents = (eventName: string, callback: any) => {
    return useEventListener(
      eventName,
      useCallback(callback, [cryptoBetLibrary?.proxyContract]),
      cryptoBetLibrary?.proxyContract
    );
  };

  return {
    ...cryptoBetLibrary,
    loading: !cryptoBetLibrary,
    tenantId,
    useCryptoBetEvents,
  };
}

export const CryptoBet = createContainer(CryptoBetState);

export function useCryptoBet() {
  return useContainer(CryptoBet);
}
