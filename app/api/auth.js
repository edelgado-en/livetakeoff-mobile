import client from "./client";

const login = (username, password) => client.post("/api/token/", { username, password });

export default {
    login
};