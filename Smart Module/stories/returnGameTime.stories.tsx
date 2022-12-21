import { ReturnGameTime } from "./returnGameTime";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/ReturnGameTime",
  component: ReturnGameTime,
} as ComponentMeta<typeof ReturnGameTime>;

const Template: ComponentStoryFn<typeof ReturnGameTime> = () => (
  <HyperverseProvider>
    <ReturnGameTime />
  </HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
