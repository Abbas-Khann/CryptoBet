import { HaveWinnersBeenRewarded } from "./haveWinnersBeenRewarded";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/HaveWinnersBeenRewarded",
  component: HaveWinnersBeenRewarded,
} as ComponentMeta<typeof HaveWinnersBeenRewarded>;

export const Demo: ComponentStoryFn<typeof HaveWinnersBeenRewarded> = (args) => (
  <HyperverseProvider>
    <HaveWinnersBeenRewarded />
  </HyperverseProvider>
);

Demo.args = {};
