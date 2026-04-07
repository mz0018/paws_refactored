import { Form } from '../../ui/form/Form'
import { Input } from '../../ui/form/Input'
import { Button } from '../../ui/form/Buttons'
import { ErrorText } from '../../ui/form/ErrorText'
import { ProductImages } from '../../ui/form/ProductImages'
import { useAddProduct } from '../../hooks/useAddProduct'

const AddProducts = () => {

    const { isLoading, hasError, files, handleFileChange, handleSubmit } = useAddProduct()

    return (
        <>
            <h1>Add Product</h1>
            <p>This is the add product page.</p>

            <Form onSubmit={handleSubmit}>
                <Input type='text' name='name' placeholder='Product Name' />
                <Input type='text' name='category' placeholder='ProductCategory' />
                <Input type='text' name='description' placeholder='Product Description' />
                <Input type='number' name='price' placeholder='Product Price' />
                <Input type='number' name='stock' placeholder='Product Stock' />

                <Input type='file' accept='image/*' onChange={handleFileChange} multiple />

                <ErrorText message={hasError.productName} />
                <ErrorText message={hasError.productCategory} />
                <ErrorText message={hasError.productDescription} />
                <ErrorText message={hasError.productPrice} />
                <ErrorText message={hasError.productStock} />
                <ErrorText message={hasError.productImages} />
                <ErrorText message={hasError.general} />

                <Button type='submit' disabled={isLoading}>
                    {isLoading ? 'Adding Product...' : 'Add Product'}
                </Button>
            </Form>

            {files.map(file => (
                <ProductImages key={file.name} src={URL.createObjectURL(file)} alt={file.name} />
            ))}
        </>
    )
}

export default AddProducts