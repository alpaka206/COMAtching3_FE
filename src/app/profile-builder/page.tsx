'use client'

import dynamic from 'next/dynamic'

const ProfileBuilderClient = dynamic(() => import('./_components/ProfileBuilderClient'), {
  ssr: false,
})

export default function Page() {
  return <ProfileBuilderClient />
}
