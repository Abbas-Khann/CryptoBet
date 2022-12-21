import { ReturnWinners } from "./returnWinners";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/ReturnWinners",
  component: ReturnWinners,
} as ComponentMeta<typeof ReturnWinners>;

const Template: ComponentStoryFn<typeof ReturnWinners> = () => (
  <HyperverseProvider>
    <ReturnWinners/>
  </HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
