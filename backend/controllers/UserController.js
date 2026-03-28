class UserController {

    async verifyUser(req, res) {
        res.status(200).json({
            message: 'User Verified'
        })
    }
}

export default new UserController()