class Config {
	private params: any = null;

	constructor() {
		this.params = { loginUrl: '/login' };
	}

	set(params: any) {
		this.params = {
			...this.params,
			...params,
		};
	}

	get(key: string | string[]) {
		const params = this.params;

		if (Array.isArray(key)) {
			let value = params;

			for (let i = 0; i < key.length; i++) {
				value = value[key[i]];
			}

			return value;
		}

		return params[key];
	}
}

export default (new Config);