import { GetLatestPrice } from "./getLatestPrice";
import { HyperverseProvider } from "./utils/Provider";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

export default {
  title: "Components/GetLatestPrice",
  component: GetLatestPrice,
} as ComponentMeta<typeof GetLatestPrice>;

const Template: ComponentStoryFn<typeof GetLatestPrice> = () => (
  <HyperverseProvider>
    <GetLatestPrice />
  </HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
