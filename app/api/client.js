import { create } from "apisauce";
import authStorage from "../auth/storage";
import settings from "../config/settings";

const apiClient = create({
    baseURL: settings.apiUrl
});

apiClient.addAsyncRequestTransform(async (request) => {
    if (!request.url.endsWith('/token/')) {
        const token = await authStorage.getToken();
        if (!token) return;
        request.headers["Authorization"] = `JWT ${token}`;
    }
});

export default apiClient;