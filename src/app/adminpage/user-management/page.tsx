'use client'

import dynamic from 'next/dynamic'

const UserManagementPage = dynamic(() => import('@/screens/UserManagementPage'), {
  ssr: false,
})

export default function Page() {
  return <UserManagementPage />
}
