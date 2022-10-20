import axios from 'axios';
import { message, Modal, notification } from 'antd';
import { auth } from '../../index';

interface Options {
	url?: string;
	method?: string;
	showError?: boolean;
	data?: any;
	body?: any;
	params?: any;
	content?: any;
	api?: boolean;
	headers?: any;
}

interface HttpErrorHandlerProps {
	title: string;
	content: string;
	component: string;
	type: string;
}

function queryParams(params: any): string {
	const keys = Object.keys(params);
	const query: string[] = [];

	keys.forEach(el => {
		const valor = params[el];

		if (valor && valor != 'null') {
			query.push(encodeURIComponent(el) + '=' + encodeURIComponent(valor));
		}
	});

	return query.join('&');
}

function normalizeParams(dirtOptions: Options) {
	const options: Options = {
		method: 'GET',
		showError: false,
		data: {},
		api: true,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	}

	if (dirtOptions.showError === true) {
		options.showError = true;
	}

	if (typeof dirtOptions.method === 'string') {
		options.method = dirtOptions.method.trim().toUpperCase();
	}

	options.data = dirtOptions.params || dirtOptions.body || dirtOptions.data || {};

	if (typeof dirtOptions.headers === 'object') {
		options.headers = dirtOptions.headers;
	}

	if (dirtOptions.api === false) {
		options.api = false;
	} else {
		if (auth.user?.token) {
			options.headers.Authentication = auth.user.token;
			options.url = '/api' + options.url;
		}
	}

	return options;
}

function normalizeUrl(url: string, { method, api, content }: Options) {
	let newUrl = url?.trim();

	if (api) newUrl = ('/api' + newUrl);

	if (method != 'GET' && method != 'DELETE') return newUrl;

	if (content) {
		newUrl = ('?' + queryParams(content));
	}

	return newUrl;
}

function createErrorMessage(err: HttpErrorHandlerProps) {
	const props = {
		title: err?.title || '',
		content: err?.content || '',
	}

	switch (err.component) {
		case 'message':

			if (err.type === 'warn') {
				message.warn(props.title);
			} else if (err.type === 'warning') {
				message.warning(props.title);
			} else {
				message.error(props.title);
			}

			break;
		case 'modal':

			if (err.type === 'warn') {
				Modal.warn(props);
			} else if (err.type === 'warning') {
				Modal.warning(props);
			} else {
				Modal.error(props);
			}

			break;
		case 'notification':

			if (err.type === 'warn') {
				notification.warn({ message: props.title, description: props.content });
			} else if (err.type === 'warning') {
				notification.warning({ message: props.title, description: props.content });
			} else {
				notification.error({ message: props.title, description: props.content });
			}

			break;
	}

	return err;
}

async function http(url: string, options: Options): Promise<any> {
	const opts = normalizeParams(options || {});
	const formattedUrl = normalizeUrl(url, opts);

	return new Promise((resolve, reject) => {
		axios({
			method: opts.method,
			url: formattedUrl,
			params: opts.data,
			data: opts.data,
			headers: opts.headers,
		}).then((res) => {
			resolve(res.data);
		}).catch((err) => {
			if (opts.showError) {
				createErrorMessage(err.response.data);
			}

			reject(err.response.data);
		});
	});
}

export { http, queryParams };