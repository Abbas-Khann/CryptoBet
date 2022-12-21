import { StartGame } from "./startGame";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/StartGame",
  component: StartGame,
} as ComponentMeta<typeof StartGame>;

export const Demo: ComponentStoryFn<typeof StartGame> = (args) => (
  <HyperverseProvider>
    <StartGame {...args} />
  </HyperverseProvider>
);

Demo.args = {
  setTime: 100000,
};
