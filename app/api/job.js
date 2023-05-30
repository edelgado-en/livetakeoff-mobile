import apiClient from "./client";

const getJobFormInfo = () => apiClient.get("/api/jobs/form-info");

const createJob = (job, onUploadProgress) => {
    const data = new FormData();
    data.append("tail_number", job.tailNumber);
    data.append("customer_id", job.customer.id);
    data.append("aircraft_type_id", job.aircraftType.id);
    data.append("airport_id", job.airport.id);
    data.append("fbo_id", job.fbo.id);
    data.append("services", job.selectedServiceIds)
    data.append("retainer_services", job.selectedRetainerServiceIds)
    data.append("on_site", false)
    data.append("estimated_arrival_date", null)
    data.append("estimated_departure_date", null)
    data.append("complete_by_date", null)
    data.append("tags", [])
    data.append("comment", null)
    data.append("requested_by", null)

    console.log(job);

    job.images.forEach((image, index) => {
        console.log(image)
    })

    return apiClient.post('/api/jobs/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progress) => {
            onUploadProgress(progress.loaded / progress.total)
        },
    });
}

export default { getJobFormInfo, createJob };