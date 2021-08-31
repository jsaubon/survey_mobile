import getEnvironment from "./getEnvironment";

export default function getApiUrl() {
	if (getEnvironment() === "KLAVEN") {
		return "http://192.168.1.9:8000";
	} else if (getEnvironment() === "LOCAL") {
		return "http://172.17.32.27:8000";
	} else if (getEnvironment() === "PRODUCTION") {
		return "http://dost.test";
	}
}
