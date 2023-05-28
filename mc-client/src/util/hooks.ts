// I mostly copied from https://usehooks-ts.com/react-hook/use-fetch for the sake of time and best practice

import { useEffect, useRef } from 'react'

// Credit Dan Abramov
export function useInterval(callback: () => {}, delay: number) {
    const savedCallback = useRef<() => {}>()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current && savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

//export default useFetch
