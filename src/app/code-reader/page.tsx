'use client'

import dynamic from 'next/dynamic'

const CodeReaderClient = dynamic(() => import('./_components/CodeReaderClient'), {
  ssr: false,
})

export default function Page() {
  return <CodeReaderClient />
}
