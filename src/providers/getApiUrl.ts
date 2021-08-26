import getEnvironment from "./getEnvironment";

export default function getApiUrl() {
	return getEnvironment() === "LOCAL"
		? "http://127.0.0.1:8000"
		: "http://dost.test";
}
