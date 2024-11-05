'use client'

import dynamic from 'next/dynamic'

const OpenReplayNoSSR = dynamic(() => import('@/components/openReplay'), {
  ssr: false,
})

export default function OpenReplayWrapper() {
  return <OpenReplayNoSSR />
} 