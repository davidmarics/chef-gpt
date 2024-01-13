import { currentUser } from "@clerk/nextjs"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

interface HomeLayoutProps {
  children: React.ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const user = await currentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="mx-auto flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
