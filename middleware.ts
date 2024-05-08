// middleware is not nextauth specific, it is nextjs specific convention so 
// the file has to be called 'middleware.ts' 
// Adding auth to your Middleware is optional, but recommended to keep the user session alive.
// import { auth } from "./auth"

//needed for edge compatibility and forcing jwt strategy 
import authConfig from "@/auth.config"
import NextAuth from "next-auth";
import { 
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    authRoutes,
 } from "@/routes";

// NOTE TODO: from docs export const { auth: middleware } = NextAuth(authConfig)
// why isn't middleware explicitly needed here 

const { auth } = NextAuth(authConfig);
// ts error 05-08-24: req return type was updated in NextAuth so I had to get rid of the 
// return null; and change them to return; 
export default auth((req) => {
  // req.auth
  // since most of our routes will be private, we will make all routes protected by default
  // and make explicit exceptions for the few public routes like landing page,login, etc 

    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    console.log("ROUTE: -------", nextUrl.pathname);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    //allow all api routes 
    if (isApiAuthRoute) {
        return;
    }

    //allow auth routes since we didn't include them in public routes 
    if (isAuthRoute) {
        if(isLoggedIn) {
            // when using redirect in middleware, and new URL constructor, 
            // pass in nextURL so that it creates an absolute URL 
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    //redirect to log in page if not logged in and attempting to access a private route 
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/login', nextUrl));
    }

    return;
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    // any routes included in matcher will invoke the above auth() function 
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],//from clerk auth middleware 
    // all routes except next static files and next images will invoke middleware 
    // now we can request req.auth as a boolean in auth() and implement logic for handling 
    // authorization across every route in the app 

    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],//from authjs 
  }