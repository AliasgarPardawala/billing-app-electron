export default class InvoiceApi {
    apiClient;
    constructor(apiClient) {
        this.apiClient = apiClient
    }
    getAll = () => {
        return this.apiClient.get("invoice")
    }

    get = (id) => {
        return this.apiClient.get(`invoice/${id}`)
    }

    create = (body) => {
        return this.apiClient.post("invoice/create", body)
    }

    update = (id, body) => {
        return this.apiClient.put(`invoice/${id}`, body)
    }

    delete = (id) => {
        return this.apiClient.delete(`invoice/${id}`)
    }
}