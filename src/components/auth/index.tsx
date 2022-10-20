import { hasLocalStorage, configTab } from '../../index';

const USER_KEY = 'userKeyLocalStorage';
let user: any = false;

if (hasLocalStorage) {
	const item = hasLocalStorage.getItem(USER_KEY);

	if (item && item != 'undefined') {
		user = JSON.parse(item);
	}
}

const auth = {
	user,
	index: -1,
	callbacks: {},

	init(login: any, logout: any) {
		this.login = login;
		this._logout = logout;
	},

	logout() {
		this._logout(() => {
			configTab.removeAll();
		});
	},

	onUserChange(userChange: any): number {
		this.callbacks[++this.index] = userChange;

		return this.index;
	},

	removeUserChange(index: number) {
		delete this.callbacks[index];
	},

	userChange(user: any) {
		if (hasLocalStorage) {
			hasLocalStorage.setItem(USER_KEY, JSON.stringify(user));
		}

		this.user = user;
		const callbacks = this.callbacks;

		for (const key in callbacks) {
			if (Object.keys(callbacks).indexOf(key) > -1) {
				callbacks[key](user);
			}
		}
	},

	permis(index: number, key: string | string[], permisKey = 'permissoes') {
		const user = this?.user;

		if (!user) return false;

		if (user.admin) return true;

		if (!Array.isArray(user[permisKey])) return false;

		if (Array.isArray(key)) {
			for (let i = 0; i < key.length; i++) {
				if (user[permisKey][index]?.[key[i]]) return true;
			}

			return false;
		}

		return user[permisKey][index]?.[key];
	}
};

export default auth;