import { Storage } from "@capacitor/storage";

export default async function setStorage(key_name: any, key_value) {
	await Storage.set({
		key: key_name,
		value: key_value,
	});
	return true;
}
