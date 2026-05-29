import { Button } from '../../ui/form/Buttons'

type Product = {
    _id?: string
    productName: string
    productPrice: number
    images?: { url: string }[]
}

type BtnBuyNowProps = {
    product: Product
    selectedImageIndex?: number
}

export const BtnBuyNow = ({ product, selectedImageIndex = 0 }: BtnBuyNowProps) => {

    const handleClick = () => {
        console.log(product)
        console.log(selectedImageIndex)
    }

    return (
        <Button
            className="w-full border border-btn-black-bg font-semibold text-btn-black-bg hover:bg-btn-black-bg/10 transition"
            onClick={handleClick}
        >
            Buy now
        </Button>
    )
}