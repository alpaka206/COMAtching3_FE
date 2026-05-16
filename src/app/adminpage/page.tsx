'use client'

import dynamic from 'next/dynamic'

const AdminLoginClient = dynamic(
  () => import('./_components/AdminLoginClient'),
  { ssr: false },
)

export default function Page() {
  return <AdminLoginClient />
}
