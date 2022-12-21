import { useCryptoBet } from "../source/react";
import { useEffect, useState } from "react";

export const ReturnLowBetters = () => {
  const cryptoBet = useCryptoBet();
  const [data, setData] = useState<string[]>();

  useEffect(() => {
    if (cryptoBet.returnLowBetters) {
      cryptoBet.returnLowBetters().then(setData);
    }
  }, [cryptoBet.returnLowBetters]);

  const lowBetters = () => {
    return data ? (
      <p>{JSON.stringify(data)}</p>
    ) : (
      <p>{JSON.stringify(cryptoBet.error)}</p>
    );
  };

  return (
    <div> Low Betters: {lowBetters()}</div>
  );
};
