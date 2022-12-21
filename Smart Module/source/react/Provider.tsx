import { CryptoBet } from './useCryptoBet';
import { FC } from 'react';
import { HyperverseModuleInstance } from '@decentology/hyperverse';

const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	return <CryptoBet.Provider initialState={{ tenantId: tenantId }}>{children}</CryptoBet.Provider>;
};

export { Provider };
