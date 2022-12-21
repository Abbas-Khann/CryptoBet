import { useCryptoBet } from "../source/react";
import { useEvm } from "@decentology/hyperverse-evm/react";
import "./style.css";

export const SetPause = ({ ...props }: { value: boolean }) => {
  const { setPause } = useCryptoBet();
  const { Connect } = useEvm();

  return (
    <>
      <Connect />
      <button
        type="button"
        className={["storybook-button", `storybook-button--large`].join(" ")}
        style={{ color: "blue" }}
        onClick={() => {
          setPause!(props);
        }}
      >
        Set Pause
      </button>
    </>
  );
};
