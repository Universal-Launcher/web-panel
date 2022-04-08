import { NextRequest, NextResponse } from "next/server"
import { getUser } from "../../lib/auth"

export async function middleware(req: NextRequest) {
  const response = NextResponse.next()

  const isAuthRoutes =
    req.nextUrl.pathname.includes("/clientpanel/login") ||
    req.nextUrl.pathname.includes("/clientpanel/register")

  try {
    await getUser()
  } catch (error) {
    if (isAuthRoutes) {
      return response
    }

    const url = req.nextUrl.clone()
    url.pathname = "/clientpanel/login"
    url.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthRoutes) {
    return NextResponse.redirect("/clientpanel/")
  }
  return response
}
