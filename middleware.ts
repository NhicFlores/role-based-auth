//middleware is not nextauth specific, it is nextjs specific convention so 
//the file has to be called 'middleware.ts' 
//Adding auth to your Middleware is optional, but recommended to keep the user session alive.
import { auth } from "./auth"

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  console.log("ROUTE: ", req.nextUrl.pathname);
  console.log("IS LOGGED IN:", isLoggedIn);
  //since most of our routes will be private, we will make all routes protected by default
  //and make explicit exceptions for the few public routes like landing page,login, etc 
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    //any routes included in matcher will invoke the above auth() function 
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],//from clerk auth middleware 
    //all routes except next static files and next images will invoke middleware 
    //now we can request req.auth as a boolean in auth() and implement logic for handling 
    //authorization across every route in the app 

    //matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],//from authjs 
  }