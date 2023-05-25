import apiClient from "./client";

const getJobFormInfo = () => apiClient.get("/api/jobs/form-info");

export default { getJobFormInfo };