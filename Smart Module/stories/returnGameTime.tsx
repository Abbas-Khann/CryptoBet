import { useCryptoBet } from "../source/react";
import { useEffect, useState } from "react";

export const ReturnGameTime = () => {
  const cryptoBet = useCryptoBet();
  const [data, setData] = useState<number>();

  useEffect(() => {
    if (cryptoBet.returnGameTime) {
      cryptoBet.returnGameTime().then(setData);
    }
  }, [cryptoBet.returnGameTime]);

  const returnGameTime = () => {
    return data ? (
      <p>{JSON.stringify(data)}</p>
    ) : (
      <p>{JSON.stringify(cryptoBet.error)}</p>
    );
  };

  return (
    <div> Game Time: {returnGameTime()}</div>
  );
};
