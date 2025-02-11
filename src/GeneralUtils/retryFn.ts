function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchData(): Promise<string> {
	if (Math.random() > 0.5) {
		return 'Data fetched successfully!';
	} else {
		throw new Error('Failed to fetch data');
	}
}

async function retry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
	for (let i = 0; i < retries; i++) {
		try {
			return await fn();
		} catch (error) {
			if (i < retries - 1) {
				await delay(1000);
			}
		}
		throw new Error(`Request failed after ${retries} retries`);
	}
}

retry(fetchData, 3)
	.then((data) => {
		console.log(data);
	})
	.catch((e) => console.log(e));
