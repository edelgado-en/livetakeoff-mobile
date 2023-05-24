import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
    baseURL: "https://api-livetakeoff.herokuapp.com"
});

apiClient.addAsyncRequestTransform(async (request) => {
    console.log('request', request)
});

export default apiClient;