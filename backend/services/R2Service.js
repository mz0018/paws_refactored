import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
})

class R2Service {
    async uploadImage(file) {
        const extension = path.extname(file.originalname)
        const key = `product-images/${randomUUID()}${extension}`

        await r2.send(new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        }))

        return `${process.env.R2_PUBLIC_DEVELOPMENT_URL}/${key}`
    }
}

export default new R2Service()