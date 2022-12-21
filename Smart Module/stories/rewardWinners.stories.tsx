import { RewardWinners } from "./rewardWinners";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/RewardWinners",
  component: RewardWinners,
} as ComponentMeta<typeof RewardWinners>;

const Template: ComponentStoryFn<typeof RewardWinners> = (args) => (
  <HyperverseProvider>
    <RewardWinners />
  </HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
