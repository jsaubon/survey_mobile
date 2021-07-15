import getStorage from "./getStorage";

export default async function getApiKey() {
  await getStorage("api_key").then((res) => {
    let apiKey = "kNKjUUqgqExS7ytNf9oM72TCCGra0Vz1gnUvTJmM22zgIOgoaT3AT04nspSq";
    return apiKey;
  });
}
