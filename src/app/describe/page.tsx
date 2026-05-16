'use client'

import dynamic from 'next/dynamic'

const DescribeClient = dynamic(() => import('./_components/DescribeClient'), { ssr: false })

export default function Page() {
  return <DescribeClient />
}
