'use client'

import dynamic from 'next/dynamic'

const QRGeneratorClient = dynamic(() => import('./_components/QRGeneratorClient'), {
  ssr: false,
})

export default function Page() {
  return <QRGeneratorClient />
}
