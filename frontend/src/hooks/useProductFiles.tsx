import { useState, useEffect, useRef } from 'react'

type FileWithPreview = {
    file: File
    preview: string
}

export const useProductFiles = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const previewsRef = useRef<string[]>([])
    const [hasError, setHasError] = useState<{
        productImages?: string
        general?: string
    }>({})

    const MAX_SIZE = 2 * 1024 * 1024
    const MAX_FILES = 5

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return

        const incomingCount = Array.from(e.currentTarget.files).length
        if (files.length + incomingCount > MAX_FILES) {
            setHasError(prev => ({
                ...prev,
                productImages: `You can only upload up to ${MAX_FILES} images`
            }))
            return
        }

        const selected = Array.from(e.currentTarget.files).map(file => {
            const preview = URL.createObjectURL(file)
            previewsRef.current.push(preview)
            return { file, preview }
        })

        for (const { file } of selected) {
            if (!file.type.startsWith('image/')) {
                setHasError(prev => ({ ...prev, productImages: 'Only image files are allowed' }))
                return
            }

            if (file.size > MAX_SIZE) {
                setHasError(prev => ({ ...prev, productImages: 'Each image must be under 2MB' }))
                return
            }
        }

        setFiles(prev => {
            const newFiles = selected.filter(
                newFile =>
                    !prev.some(
                        f =>
                            f.file.name === newFile.file.name &&
                            f.file.lastModified === newFile.file.lastModified
                    )
            )
            return [...prev, ...newFiles]
        })

        e.currentTarget.value = ''
    }

    const handleRemoveFile = (fileToRemove: FileWithPreview) => {
        URL.revokeObjectURL(fileToRemove.preview)
        previewsRef.current = previewsRef.current.filter(p => p !== fileToRemove.preview)
        setFiles(prev =>
            prev.filter(f => f.preview !== fileToRemove.preview)
        )
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        if (fileInput) fileInput.value = ''
    }

    const resetFiles = () => {
        previewsRef.current.forEach(preview => URL.revokeObjectURL(preview))
        previewsRef.current = []
        setFiles([])
        setHasError(prev => ({ ...prev, productImages: undefined }))
    }

    useEffect(() => {
        return () => {
            previewsRef.current.forEach(preview => URL.revokeObjectURL(preview))
        }
    }, [])

    return {
        files,
        handleFileChange,
        handleRemoveFile,
        resetFiles,
        hasError,
        setHasError
    }
}
