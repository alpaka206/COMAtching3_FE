'use client'

import dynamic from 'next/dynamic'

const Userinfo = dynamic(() => import('@/screens/User_info_page'), {
  ssr: false,
})

export default function Page() {
  return <Userinfo />
}
