'use client'

import dynamic from 'next/dynamic'

const QRGenerator = dynamic(() => import('@/screens/QRGenerator'), {
  ssr: false,
})

export default function Page() {
  return <QRGenerator />
}
