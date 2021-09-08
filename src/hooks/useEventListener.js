import { useEffect, useRef } from 'react'

const useEventListener = (eventType, handler) => {
    const handlerRef = useRef(handler)

    useEffect(() => {
        handlerRef.current = handler
    }, [handler])

    useEffect(() => {
        const internalHandler = (e) => {
            return handlerRef.current(e)
        }
        document.addEventListener(eventType, internalHandler)

        return () => {
            document.removeEventListener(eventType, internalHandler)
        }
        // eslint-disable-next-line
    }, [eventType])
}

export default useEventListener
