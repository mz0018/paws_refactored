
import { useState } from 'react'

export const useQRGenerator = () => {

    const [qrValue, setQrValue] = useState<string | null>(null)

    const handleGenerate = (dataToConvert: any) => {
        try {
            const receipt = dataToConvert.map((item: any) => ({
                name: item.productName,
                price: item.productPrice,
                qty: item.quantity
            }))
            setQrValue(JSON.stringify(receipt))
        } catch (err) {
            console.error('QR Generation failed: ', err)
        }
    }

    const closeQR = () => setQrValue(null)
            
    return { qrValue, handleGenerate, closeQR }
}  