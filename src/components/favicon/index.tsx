export interface FaviconSetConfig {
	url?: string;
	type?: string;
	rel?: string;
}

const favicon = {
	set(cfg: FaviconSetConfig) {
		const { url = '', type = 'image/x-icon', rel = 'shortcut icon' } = cfg;

		const link = document.querySelector("link[rel*='icon']") || document.createElement('link');

		link.setAttribute('type', type);
		link.setAttribute('rel', rel);
		link.setAttribute('href', url);

		document.getElementsByTagName('head')[0].appendChild(link);
	}
};

export default favicon;