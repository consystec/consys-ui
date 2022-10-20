import { Config } from '../../index';

const documentTitle = {
	set(str: string, after?: boolean) {
		let title = Config.get('projectName');

		if (after && str) {
			title = title.concat(' - ', str);
		} else if (str) {
			title = str.concat(' - ', title)
		}

		const link = document.querySelector('title') || document.createElement('title');

		link.innerHTML = title;
		document.title = title;
	}
};

export default documentTitle;