import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { getUser } from "../../lib/auth"

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  let response = NextResponse.next()

  if (req.nextUrl.pathname.includes("/clientpanel/login")) return response

  try {
    await getUser()
  } catch (error) {
    const url = req.nextUrl.clone()

    url.pathname = "/clientpanel/login"
    url.searchParams.set("redirect", req.nextUrl.pathname)
    response = NextResponse.redirect(url)
  }

  return response
}
