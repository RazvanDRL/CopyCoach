'use client'
import { useEffect } from "react"
import Tracker from '@openreplay/tracker'

let tracker: any

if (typeof window !== 'undefined') {
    tracker = new Tracker({
        projectKey: "oCvxQopmALmQuTNYrRi4",
    })
}

const Openreplay = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && tracker) {
            tracker.start()
        }
    }, [])

    return null
}

export default Openreplay