import { Form } from '../../ui/form/Form'
import { Input } from '../../ui/form/Input'
import { Button } from '../../ui/form/Buttons'
import { Select } from '../../ui/form/Select'
import { ErrorText } from '../../ui/form/ErrorText'
import { ProductImages } from '../../ui/form/ProductImages'
import { useAddProduct } from '../../hooks/useAddProduct'
import { ClipLoader } from 'react-spinners'

const AddProducts = () => {

    const { isLoading, hasError, files, handleFileChange, handleSubmit } = useAddProduct()

    return (
        <>
            <h1>Add Product</h1>
            <p>This is the add product page.</p>

            <Form onSubmit={handleSubmit}>
                <Input type='text' name='productName' placeholder='Product Name' error={hasError.productName} />
                <Select name='productCategory' error={hasError.productCategory} />
                <Input type='text' name='productDescription' placeholder='Product Description' error={hasError.productDescription} />
                <Input type='number' name='productPrice' placeholder='Product Price' error={hasError.productPrice} />
                <Input type='number' name='stock' placeholder='Product Stock' error={hasError.productStock} />

                <Input type='file' accept='image/*' onChange={handleFileChange} multiple error={hasError.productImages} />

                <ErrorText message={
                    hasError.productName ||
                    hasError.productCategory ||
                    hasError.productDescription ||
                    hasError.productPrice ||
                    hasError.productStock ||
                    hasError.productImages ||
                    hasError.general
                } />

                <Button type='submit' disabled={isLoading}>
                    {isLoading ? <ClipLoader size={20} color='white' /> : 'Add Product'}
                </Button>
            </Form>

            {files.map(file => (
                <ProductImages key={file.name} src={URL.createObjectURL(file)} alt={file.name} />
            ))}
        </>
    )
}

export default AddProducts