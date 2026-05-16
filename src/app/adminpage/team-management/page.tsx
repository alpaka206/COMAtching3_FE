'use client'

import dynamic from 'next/dynamic'

const TeamManagementClient = dynamic(() => import('./_components/TeamManagementClient'), {
  ssr: false,
})

export default function Page() {
  return <TeamManagementClient />
}
