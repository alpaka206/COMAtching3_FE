'use client'

import dynamic from 'next/dynamic'

const QRGenerator = dynamic(() => import('@/legacy-pages/QRGenerator'), {
  ssr: false,
})

export default function Page() {
  return <QRGenerator />
}
