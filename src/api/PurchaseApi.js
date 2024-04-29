export default class PurchaseApi {
    apiClient;
    constructor(apiClient) {
        this.apiClient = apiClient
    }
    getAll = () => {
        return this.apiClient.get("purchase")
    }

    get = (id) => {
        return this.apiClient.get(`purchase/${id}`)
    }

    create = (body) => {
        return this.apiClient.post("purchase/create", body)
    }

    update = (id, body) => {
        return this.apiClient.put(`purchase/${id}`, body)
    }

    delete = (id) => {
        return this.apiClient.delete(`purchase/${id}`)
    }
}