'use client'

import dynamic from 'next/dynamic'

const AdminChargeRequestsClient = dynamic(() => import('./_components/AdminChargeRequestsClient'), {
  ssr: false,
})

export default function Page() {
  return <AdminChargeRequestsClient />
}
