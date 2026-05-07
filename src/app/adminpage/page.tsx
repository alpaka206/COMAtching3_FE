'use client'

import dynamic from 'next/dynamic'

const Adminpageunlogin = dynamic(
  () => import('@/legacy-pages/Adminpage_unlogin'),
  { ssr: false },
)

export default function Page() {
  return <Adminpageunlogin />
}
