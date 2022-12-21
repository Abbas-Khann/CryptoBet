import { ReturnLowBetters } from "./returnLowBetters";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/ReturnLowBetters",
  component: ReturnLowBetters,
} as ComponentMeta<typeof ReturnLowBetters>;

const Template: ComponentStoryFn<typeof ReturnLowBetters> = () => (
  <HyperverseProvider>
    <ReturnLowBetters />
  </HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
