'use client'

import { useEffect } from 'react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import NextLink from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type NavigateOptions = {
  replace?: boolean
  state?: unknown
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  replace?: boolean
  children?: ReactNode
}

export function useNavigate() {
  const router = useRouter()

  return (to: string | number, options?: NavigateOptions) => {
    if (typeof to === 'number') {
      window.history.go(to)
      return
    }

    if (options?.replace) {
      router.replace(to)
      return
    }

    router.push(to)
  }
}

export function useLocation() {
  const pathname = usePathname() ?? '/'
  const searchParams = useSearchParams()
  const search = searchParams?.toString() ?? ''

  return {
    pathname,
    search: search ? `?${search}` : '',
    hash: typeof window === 'undefined' ? '' : window.location.hash,
    state: null,
    key: '',
  }
}

export function Link({ to, replace, children, ...props }: LinkProps) {
  return (
    <NextLink href={to} replace={replace} {...props}>
      {children}
    </NextLink>
  )
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function Route() {
  return null
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to, { replace })
  }, [navigate, replace, to])

  return null
}
