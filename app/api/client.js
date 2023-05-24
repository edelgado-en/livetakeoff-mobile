import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
    baseURL: "https://api-livetakeoff.herokuapp.com"
});

apiClient.addAsyncRequestTransform(async (request) => {

    if (!request.url.endsWith('/token/')) {
        console.log('url that needs authentication')
        const token = await authStorage.getToken();
        if (!token) return;
        request.headers["Authorization"] = `JWT ${token}`;
    }
});

export default apiClient;