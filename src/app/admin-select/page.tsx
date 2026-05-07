import { redirect } from 'next/navigation'

import { ROUTES } from '@/routes'

export default function Page() {
  redirect(ROUTES.adminChargeRequests)
}
