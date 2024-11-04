'use client'
import { useEffect } from "react"
import Tracker from '@openreplay/tracker'

const tracker = new Tracker({
    projectKey: "oCvxQopmALmQuTNYrRi4",
})

const Openreplay = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            tracker.start()
        }
    }, [])

    return null
}

export default Openreplay 