import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
    baseURL: "https://api-livetakeoff.herokuapp.com"
});

apiClient.addAsyncRequestTransform(async (request) => {
    if (!request.url.endsWith('/token/')) {
        const token = await authStorage.getToken();
        if (!token) return;
        request.headers["Authorization"] = `JWT ${token}`;
    }
});

export default apiClient;