import UserService from '../services/UserService.js'
class UserController {

    verifyUser = async (req, res, next) => {
        try {
            const result = UserService.verifyUser()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    signupUser = async (req, res, next) => {
        try {
            const userData = req.body

            const result = await UserService.signupUser(userData)

            res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    signinUser = async (req, res, next) => {
        try {
            const credentials = req.body

            const result = await UserService.signinUser(credentials)

            res.status(200).json(result)
            
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()