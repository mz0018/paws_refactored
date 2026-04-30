import { upload } from './upload.js'

export const productFileSize = (req, res, next) => {
  upload.fields([{ name: 'images', maxCount: 5 }])(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'File size exceeds 2MB limit' })
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(413).json({ message: 'Max 5 images allowed' })
      }
      return next(err)
    }
    next()
  })
}