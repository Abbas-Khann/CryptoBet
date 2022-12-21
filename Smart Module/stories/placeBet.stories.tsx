import { PlaceBet } from './placeBet';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/PlaceBet',
	component: PlaceBet,
} as ComponentMeta<typeof PlaceBet>;

export const Demo: ComponentStoryFn<typeof PlaceBet> = (args) => (
	<HyperverseProvider>
		<PlaceBet {...args} />
	</HyperverseProvider>
);

Demo.args = {
	bet: 0
};
