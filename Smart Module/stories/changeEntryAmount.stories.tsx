import { ChangeEntryAmount } from "./changeEntryAmount";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/ChangeEntryAmount",
  component: ChangeEntryAmount,
} as ComponentMeta<typeof ChangeEntryAmount>;

export const Demo: ComponentStoryFn<typeof ChangeEntryAmount> = (args) => (
  <HyperverseProvider>
    <ChangeEntryAmount {...args} />
  </HyperverseProvider>
);

Demo.args = {
  entryAmount: 100000,
};
