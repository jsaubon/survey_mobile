import { Storage } from "@capacitor/storage";

export default async function getStorage(key_name: any) {
  const { value } = await Storage.get({ key: key_name });

  return value;
}
