import UserService from '../services/UserService.js'
class UserController {

    verifyUser = async (req, res, next) => {
        try {
            const result = UserService.verifyUser(req.user)
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

    signoutUser = async (req, res, next) => {
        try {
            res.clearCookie('authToken', { path: '/' })
            res.status(200).json({ message: 'Logout successful' })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController()