'use client'

import dynamic from 'next/dynamic'

const UserInfoClient = dynamic(() => import('./_components/UserInfoClient'), {
  ssr: false,
})

export default function Page() {
  return <UserInfoClient />
}
