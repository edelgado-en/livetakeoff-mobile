import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
    //baseURL: "https://api-livetakeoff.herokuapp.com"
    baseURL: "http://localhost:9000"
   // baseURL: "http://192.168.86.24:9000"
});

apiClient.addAsyncRequestTransform(async (request) => {
    if (!request.url.endsWith('/token/')) {
        const token = await authStorage.getToken();
        if (!token) return;
        request.headers["Authorization"] = `JWT ${token}`;
    }
});

export default apiClient;