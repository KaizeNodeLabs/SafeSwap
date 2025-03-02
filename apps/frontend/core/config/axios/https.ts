import axios from "axios";

export const http = axios.create({
	baseURL: "https://dev.api.trustlesswork.com",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer your_api_key",
	},
});
