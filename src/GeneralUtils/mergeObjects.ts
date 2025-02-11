function isObject(obj: unknown): obj is Record<string, unknown> {
	return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

function merge<T extends Record<string, any>, U extends Record<string, any>>(
	obj1: T,
	obj2: U
): T & U {
	const result: Record<string, unknown> = { ...obj1 };

	for (const key in obj2) {
		if (Object.prototype.hasOwnProperty.call(obj2, key)) {
			const value1 = obj1[key];
			const value2 = obj2[key];

			if (isObject(value1) && isObject(value2)) {
				result[key] = merge(value1, value2);
			} else {
				result[key] = value2 !== undefined ? value2 : value1;
			}
		}
	}

	return result as T & U;
}
