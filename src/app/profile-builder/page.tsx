'use client'

import dynamic from 'next/dynamic'

const ProfileBuilder = dynamic(() => import('@/screens/ProfileBuilder'), {
  ssr: false,
})

export default function Page() {
  return <ProfileBuilder />
}
