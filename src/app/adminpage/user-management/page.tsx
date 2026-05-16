'use client'

import dynamic from 'next/dynamic'

const UserManagementClient = dynamic(() => import('./_components/UserManagementClient'), {
  ssr: false,
})

export default function Page() {
  return <UserManagementClient />
}
