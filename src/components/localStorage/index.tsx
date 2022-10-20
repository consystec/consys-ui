let hasLocalStorage: Storage | null = localStorage;

if (hasLocalStorage) {
	const testKey = 'react-localstorage.hoc.test-key';

	try {
		localStorage.setItem(testKey, 'foo');
		localStorage.removeItem(testKey);
	} catch (e) {
		hasLocalStorage = null;
	}
}

function checkRecursive(value: any) {
	for (const key in value) {
		if (typeof value[key] === 'string') {
			if (!isNaN(new Date(value[key]).getTime())) {
				value[key] = new Date(value[key]);
			}
		}

		if (!(value[key] instanceof Date) && (typeof value[key] === 'object' || Array.isArray(value[key]))) {
			checkRecursive(value[key]);
		}
	}
}

const storage = {

	getItem(name: string): any | null {
		const item = localStorage.getItem(name);

		if (typeof item !== 'undefined' && item !== null) {
			const parsedItem = JSON.parse(item);

			checkRecursive(parsedItem);

			return parsedItem;
		}

		return null;
	},

	setItem(name: string, item: string | any) {
		if (typeof item !== 'string') {
			item = JSON.stringify(item);
		}

		localStorage.setItem(name, item);
	},

	removeItem(name: string) {
		localStorage.removeItem(name);
	}
};

export default storage;
export { hasLocalStorage };