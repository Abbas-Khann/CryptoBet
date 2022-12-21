import { ReturnHighBetters } from "./returnHighBetters";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/ReturnHighBetters",
  component: ReturnHighBetters,
} as ComponentMeta<typeof ReturnHighBetters>;

const Template: ComponentStoryFn<typeof ReturnHighBetters> = (args) => (
  <HyperverseProvider>
    <ReturnHighBetters />
  </HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
