import { useCryptoBet } from "../source/react";
import { useEffect, useState } from "react";

export const HaveWinnersBeenRewarded = () => {
  const cryptoBet = useCryptoBet();
  const [data, setData] = useState<boolean>();

  useEffect(() => {
    if (cryptoBet.haveWinnersBeenRewarded) {
      cryptoBet.haveWinnersBeenRewarded().then(setData);
    }
  }, [cryptoBet.haveWinnersBeenRewarded]);

  const haveWinnersBeenRewarded = () => {
    return data ? (
      <p>{JSON.stringify(data)}</p>
    ) : (
      <p>{JSON.stringify(cryptoBet.error)}</p>
    );
  };

  return (
    <div>
      Winners Been Rewarded: {haveWinnersBeenRewarded()}
    </div>
  );
};
