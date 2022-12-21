import { useCryptoBet } from "../source/react";
import { useEffect, useState } from "react";

export const ReturnEntryAmount = () => {
  const cryptoBet = useCryptoBet();
  const [data, setData] = useState<number>();

  useEffect(() => {
    if (cryptoBet.returnEntryAmount) {
      cryptoBet.returnEntryAmount().then(setData);
    }
  }, [cryptoBet.returnEntryAmount]);

  const returnEntryAmount = () => {
    return data ? (
      <p>{JSON.stringify(data)}</p>
    ) : (
      <p>{JSON.stringify(cryptoBet.error)}</p>
    );
  };

  return (
    <div> Entry Amount: {returnEntryAmount()}</div>
  );
};
