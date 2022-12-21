import { useCryptoBet } from "../source/react";
import { useEvm } from "@decentology/hyperverse-evm/react";
import "./style.css";

export const GetLatestPrice  = () => {
  const { getLatestPrice } = useCryptoBet();
  const { Connect } = useEvm();

  return (
    <>
      <Connect />
      <button
        type="button"
        className={["storybook-button", `storybook-button--large`].join(" ")}
        style={{ color: "blue" }}
        onClick={() => {
          getLatestPrice?.();
        }}
      >
        Get Latest Price
      </button>
    </>
  );
};
