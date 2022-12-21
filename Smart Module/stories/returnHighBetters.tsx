import { useCryptoBet } from "../source/react";
import { useEffect, useState } from "react";

export const ReturnHighBetters = () => {
  const cryptoBet = useCryptoBet();
  const [data, setData] = useState<string[]>();

  useEffect(() => {
    if (cryptoBet.returnHighBetters) {
      cryptoBet.returnHighBetters().then(setData);
    }
  }, [cryptoBet.returnHighBetters]);

  const highBetters = () => {
    return data ? (
      <p>{JSON.stringify(data)}</p>
    ) : (
      <p>{JSON.stringify(cryptoBet.error)}</p>
    );
  };

  return (
    <div> High Betters: {highBetters()}</div>
  );
};
