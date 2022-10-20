import { storage, hasLocalStorage } from '../../index';

interface Tab {
	key?: string;
	title?: string;
	name?: string;
	closable?: boolean;
}

const TABS_KEY = 'tabsKeyLocalStorage';

let tabs: Tab[] = [];

if (hasLocalStorage) {
	tabs = storage.getItem(TABS_KEY) || [];
}

const configTab = {
	callbacks: {},
	index: -1,
	tabs: tabs,
	activeKey: 'false',

	onTabsChange(tabsChange: any) {
		this.callbacks[++this.index] = tabsChange;
		return this.index;
	},

	removeCallback(index: string | number) {
		delete this.callbacks[index];
	},

	_callbacks() {
		const p = this.callbacks;

		for (const key in p) {
			if (Object.keys(p).indexOf(key) > 0) {
				p[key](this.tabs);
			}
		}

		if (hasLocalStorage) {
			storage.setItem(TABS_KEY, this.tabs);
		}
	},

	removeAll() {
		this.tabs.forEach((tab: Tab) => storage.removeItem(tab.name));

		this.tabs = [];

		storage.removeItem(TABS_KEY);

		this._callbacks();
	},

	removeTab(url: string): boolean {
		let lastIndex: number;
		let tab: Tab = {};

		this.tabs.forEach((pane: any, i: number) => {
			if (pane.key === url) {
				tab = pane;
				lastIndex = i - 1;
			}

			if (lastIndex < 0) {
				lastIndex = 0;
			}
		});

		let changeActiveKey = false;

		if (tab) {
			storage.removeItem(tab.name);

			this.tabs = this.tabs.filter((tab: Tab) => tab.key !== url);

			if (this.tabs[lastIndex] && this.activeKey === url) {
				this.activeKey = this.tabs[lastIndex].key;
				changeActiveKey = true;
			}

			this._callbacks();
		}

		return changeActiveKey;
	},

	addTab(url: string, tab: Tab) {
		const { title, name, closable } = tab;
		const tabObj = { key: url, title, name, closable };
		let addTab = true;

		for (let i = 0; i < this.tabs.length; i++) {
			if (this.tabs[i].key == url) {
				addTab = false;
				this.activeKey = url;

				if (tabObj.title?.length > 0) {
					this.tabs[i] = tabObj;
				}
			}
		}

		if (addTab) {
			this.activeKey = url;
			this.tabs.push(tabObj);
		}

		this._callbacks();
	}
};
export default configTab;