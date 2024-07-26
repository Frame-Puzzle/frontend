import axios from "axios";

const authApi = axios.create({
	baseURL: `${import.meta.env.VITE_BACK_URL}/api/v1/login/oauth`,
});


export default authApi;