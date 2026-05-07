'use client'

import dynamic from 'next/dynamic'

const CodeReader = dynamic(() => import('@/legacy-pages/CodeReader'), {
  ssr: false,
})

export default function Page() {
  return <CodeReader />
}
