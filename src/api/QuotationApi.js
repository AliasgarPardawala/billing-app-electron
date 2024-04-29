export default class QuotationApi {
    apiClient;
    constructor(apiClient) {
        this.apiClient = apiClient
    }
    getAll = () => {
        return this.apiClient.get("quotation")
    }

    get = (id) => {
        return this.apiClient.get(`quotation/${id}`)
    }

    create = (body) => {
        return this.apiClient.post("quotation/create", body)
    }

    update = (id, body) => {
        return this.apiClient.put(`quotation/${id}`, body)
    }

    delete = (id) => {
        return this.apiClient.delete(`quotation/${id}`)
    }
}