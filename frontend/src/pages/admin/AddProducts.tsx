import { useState } from 'react'
import { Input } from '../../ui/form/Input'



const AddProducts = () => {

    const [files, setFiles] = useState<File[]>([])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget

        if (!input.files) return

        const selectedFiles = Array.from(input.files)

        setFiles(prev => [...prev, ...selectedFiles])
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        files.forEach(file => formData.append('images', file))

        console.log(Object.fromEntries(formData.entries()))
        console.log(formData.getAll('images'))
    }

    return (
        <>
            <h1>Add Product</h1>
            <p>This is the add product page.</p>

            <form onSubmit={handleSubmit}>
                <Input type='text' name='name' placeholder='Product Name' required />
                <Input type='text' name='category' placeholder='ProductCategory' required />
                <Input type='text' name='description' placeholder='Product Description' required />
                <Input type='number' name='price' placeholder='Product Price' required />
                <Input type='number' name='stock' placeholder='Product Stock' required />

                <input type='file' name='images' accept='image/*' onChange={handleFileChange} multiple />

                <button type='submit'>Add Product</button>
            </form>

            {files.map(file => (
                <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} width={100} />
            ))}
        </>
    )
}

export default AddProducts