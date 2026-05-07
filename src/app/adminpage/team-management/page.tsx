'use client'

import dynamic from 'next/dynamic'

const TeamManagementPage = dynamic(() => import('@/screens/TeamManagementPage'), {
  ssr: false,
})

export default function Page() {
  return <TeamManagementPage />
}
