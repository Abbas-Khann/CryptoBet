import { ReturnEntryAmount } from "./returnEntryAmount";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/ReturnEntryAmount",
  component: ReturnEntryAmount,
} as ComponentMeta<typeof ReturnEntryAmount>;

const Template: ComponentStoryFn<typeof ReturnEntryAmount> = () => (
  <HyperverseProvider>
    <ReturnEntryAmount />
  </HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
