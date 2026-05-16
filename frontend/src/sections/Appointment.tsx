import { useInView } from '../hooks/useInView'
const Appointments = () => {
    const { ref, inView } = useInView()
    return (
        <article ref={ref} id="appointment-id" className='min-h-screen'>
            {inView && (
                <>
                Appointments introduction
                </>
            )}
        </article>
    )
}

export default Appointments