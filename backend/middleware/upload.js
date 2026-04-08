import multer from 'multer'

const storage = multer.memoryStorage()

export const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed.')
            error.statusCode = 400
            return cb(error)
        }

        cb(null, true)
    }
 })

