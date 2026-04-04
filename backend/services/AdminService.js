class AdminService {

    async addProduct(product) {

        const message = `Product added successfully`

        return { message }

    }

}

export default new AdminService()