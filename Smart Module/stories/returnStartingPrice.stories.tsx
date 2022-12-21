import { ReturnStartingPrice } from './returnStartingPrice';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
  title: "Components/ReturnStartingPrice",
  component: ReturnStartingPrice,
} as ComponentMeta<typeof ReturnStartingPrice>;

const Template: ComponentStoryFn<typeof ReturnStartingPrice> = (args) => (
  <HyperverseProvider>
    <ReturnStartingPrice />
  </HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};

