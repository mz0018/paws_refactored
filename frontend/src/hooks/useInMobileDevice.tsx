import { useEffect, useState } from 'react'

const MOBILE_REGEX = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Kindle/i;

export const useInMobileDevice = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(MOBILE_REGEX.test(navigator.userAgent))
    }, [])

    return isMobile
}