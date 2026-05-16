import { useInView } from '../hooks/useInView'
const Products = () => {
    const { ref, inView } = useInView()
    return (
        <article ref={ref} id="product-id" className='min-h-screen'>
            {inView && (
                <>
                products
                {/* <img src='/img/testing.webp' /> */}
                </>
            )}
        </article>
    )
}

export default Products