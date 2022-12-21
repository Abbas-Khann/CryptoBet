import { useCryptoBet } from "../source/react";
import { useEvm } from "@decentology/hyperverse-evm/react";
import "./style.css";

export const ChangeEntryAmount = ({ ...props }: { entryAmount:number }) => {
  const { changeEntryAmount } = useCryptoBet();
  const { Connect } = useEvm();

  return (
    <>
      <Connect />
      <button
        type="button"
        className={["storybook-button", `storybook-button--large`].join(" ")}
        style={{ color: "blue" }}
        onClick={() => {
          changeEntryAmount!(props);
        }}
      >
        Change Entry Amount
      </button>
    </>
  );
};
