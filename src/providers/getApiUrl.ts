import getEnvironment from "./getEnvironment";

export default function getApiUrl() {
	return getEnvironment() === "LOCAL"
		? "http://172.17.32.27:8000"
		: "http://dost.test";
}
