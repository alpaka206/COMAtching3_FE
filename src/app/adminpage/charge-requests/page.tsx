'use client'

import dynamic from 'next/dynamic'

const AdminRequestList = dynamic(() => import('@/components/AdminRequestList'), {
  ssr: false,
})

export default function Page() {
  return <AdminRequestList />
}
