import { useCryptoBet } from "../source/react";
import { useEffect, useState } from "react";

export const ReturnWinners = () => {
  const cryptoBet = useCryptoBet();
  const [data, setData] = useState<string[]>();

  useEffect(() => {
    if (cryptoBet.returnWinners) {
      cryptoBet.returnWinners().then(setData);
    }
  }, [cryptoBet.returnWinners]);

  const returnWinners = () => {
    return data ? (
      <p>{JSON.stringify(data)}</p>
    ) : (
      <p>{JSON.stringify(cryptoBet.error)}</p>
    );
  };

  return <div> Winners: {returnWinners()}</div>;
};
