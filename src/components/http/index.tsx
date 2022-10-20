import { auth } from '../../index';

interface Options {
	method?: string;
	body?: any;
	params?: any;
	api?: boolean;
	headers?: any;
}

function queryParams(params: any): string {
	const keys = Object.keys(params);
	const query: string[] = [];

	keys.forEach((el) => {
		const valor = params[el];

		if (valor) {
			query.push(encodeURIComponent(el) + '=' + encodeURIComponent(valor));
		}
	});

	return query.join('&');
}

function normalizeParams(dirtOptions: Options) {
	const isPostOrPut = ['POST', 'PUT'].indexOf(dirtOptions.method) > -1;
	const options: Options = {
		method: 'GET',
		api: true,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}

	if (typeof dirtOptions.method === 'string') {
		options.method = dirtOptions.method.trim().toUpperCase();
	}

	if (isPostOrPut) {
		options.body = dirtOptions.body || {};
	} else {
		options.params = dirtOptions.params || {};
	}

	if (typeof dirtOptions.headers === 'object') {
		options.headers = dirtOptions.headers;
	}

	if (dirtOptions.api === false) {
		options.api = false;
	} else {
		if (auth.user?.token) {
			options.headers.Authentication = auth.user.token;
		}
	}

	return options;
}

function normalizeUrl(url: string, options: Options) {
	const { api, params, body } = options;

	let newUrl = url?.trim() || '';

	if (body) {
		return newUrl;
	}

	if (api) {
		newUrl = ('/api' + newUrl);
	}

	if (params) {
		newUrl += ('?' + queryParams(params));
	}

	return newUrl;
}

async function http(url: string, options: Options = {}): Promise<any> {
	const opts = normalizeParams(options);
	const formattedUrl = normalizeUrl(url, opts);

	return fetch(formattedUrl, opts)
		.then(async (res) => {
			return res.json()
				.then((jsonData) => {
					if (res.ok) return jsonData;

					switch (res.status) {
						case 401:
						case 408:
							auth.userChange(null);
							break;
					}

					throw jsonData;
				});
		});
}

export { http, queryParams, normalizeUrl, normalizeParams };