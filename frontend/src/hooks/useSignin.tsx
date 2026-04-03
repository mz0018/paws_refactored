import { useState } from 'react'

export const useSignin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        console.log("Email:", userName)
        console.log("Password:", password)
    }

    return { handleSubmit, isLoading, setUserName, userName, setPassword, password }

}