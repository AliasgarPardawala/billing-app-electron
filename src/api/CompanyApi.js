export default class CompanyApi {
    apiClient;
    constructor(apiClient) {
        this.apiClient = apiClient
    }
    getAll = () => {
        return this.apiClient.get("companies")
    }

    get = (id) => {
        return this.apiClient.get(`companies/${id}`)
    }

    create = (body) => {
        return this.apiClient.post("companies/add", body)
    }

    update = (id, body) => {
        return this.apiClient.put(`companies/${id}`, body)
    }

    delete = (id) => {
        return this.apiClient.delete(`companies/${id}`)
    }
}