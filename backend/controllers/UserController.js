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

            const token = await UserService.signinUser(credentials)

            res.cookie('authToken', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000,
                path: '/'
            })

            res.status(200).json({
                message: 'Login 200',
                // token,
                user: credentials.userName
            })
            
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()