import { useCryptoBet } from '../source/react';
import { useEffect, useState } from 'react';

export const ReturnStartingPrice = () => {
	const cryptoBet = useCryptoBet();
	const [data, setData] = useState<number>();

	useEffect(() => {
		if (cryptoBet.returnStartingPrice) {
      cryptoBet.returnStartingPrice().then(setData);
    }
	}, [cryptoBet.returnStartingPrice]);

	const startingPrice = () => {
		return data ? <p>{JSON.stringify(data)}</p> : <p>{JSON.stringify(cryptoBet.error)}</p>;
	};

	return <div> Starting Price: {startingPrice()}</div>;
};
