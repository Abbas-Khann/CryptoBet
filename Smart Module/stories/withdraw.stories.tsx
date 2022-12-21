import { Withdraw } from './withdraw';
import { HyperverseProvider } from './utils/Provider';
import { ComponentMeta, ComponentStoryFn } from '@storybook/react';

export default {
	title: 'Components/Withdraw',
	component: Withdraw,
} as ComponentMeta<typeof Withdraw>;

const Template: ComponentStoryFn<typeof Withdraw> = (args) => (
	<HyperverseProvider>
		<Withdraw />
	</HyperverseProvider>
);

export const Demo = Template.bind({});

Demo.args = {};
