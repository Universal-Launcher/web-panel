import { NextRequest, NextResponse } from "next/server"
import { User } from "../../typings/auth"
import { fetcher } from "../../utils/api"

export async function middleware(req: NextRequest) {
  const response = NextResponse.next()

  const isAuthRoutes =
    req.nextUrl.pathname.includes("/clientpanel/login") ||
    req.nextUrl.pathname.includes("/clientpanel/register")

  try {
    // fetch user
    await fetcher<User>("/user/auth", {
      context: req,
    }).then((d) => {
      console.log(d)
      return d
    })
  } catch (error) {
    console.log(error)
    if (isAuthRoutes) {
      return response
    }

    const url = req.nextUrl.clone()
    url.pathname = "/clientpanel/login"
    url.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthRoutes) {
    return NextResponse.redirect("/clientpanel")
  }
  return response
}
