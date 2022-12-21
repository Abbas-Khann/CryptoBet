import { SetPause } from "./setPause";
import { HyperverseProvider } from "./utils/Provider"
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/SetPause",
  component: SetPause,
} as ComponentMeta<typeof SetPause>;

export const Demo: ComponentStoryFn<typeof SetPause> = (args) => (
  <HyperverseProvider>
    <SetPause {...args} />
  </HyperverseProvider>
);

Demo.args = {
  value: true,
};
