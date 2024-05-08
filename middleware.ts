//middleware is not nextauth specific, it is nextjs specific convention so 
//the file has to be called 'middleware.ts' 
//Adding auth to your Middleware is optional, but recommended to keep the user session alive.
//import { auth } from "./auth"

//needed for edge compatibility and forcing jwt strategy 
import authConfig from "@/auth.config"
import NextAuth from "next-auth";

//NOTE TODO: from docs export const { auth: middleware } = NextAuth(authConfig)
//why isn't middleware explicitly needed here 

export const { auth } = NextAuth(authConfig);
// TODO: BUG - middleware isn't being triggered every time we switch pages by 
// clicking the link button at the bottom of the card, and it's also being triggered twice the first 
// time you click the link button
// npm run dev 
// go to http://localhost:3000/login
// observe the console log in server 
// should show :
// ROUTE: ------------------------- /login
// IS LOGGED IN: ------------------ false
// click on 'Don't have an account?' link at the bottom 
// observe the server shows two logs : 
// ROUTE: ------------------------- /register
// IS LOGGED IN: ------------------ false
// ROUTE: ------------------------- /register
// IS LOGGED IN: ------------------ false
// click 'Already have an account?' link 
// no output 
// you can click back and forth and there is no log in server 
// if you wait ~20 seconds then you can see log output again 
// i have seen it work somewhat quickly (<20s) a couple times 
// it seems like the logs are getting caught up somewhere and 
// missing their triggers. It looks like sometimes they even come 
// out in an incorrect order: /register, then /login after navigating 
// to the register page. This is very inconcistant, and I can't figure out 
// how to recreate it. 
// this started happening after the changes in this commit 
// adding auth.config.ts  

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  console.log("ROUTE: -------------------------", req.nextUrl.pathname);
  console.log("IS LOGGED IN: ------------------", isLoggedIn);
  //since most of our routes will be private, we will make all routes protected by default
  //and make explicit exceptions for the few public routes like landing page,login, etc 
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    //any routes included in matcher will invoke the above auth() function 
    //matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],//from clerk auth middleware 
    //all routes except next static files and next images will invoke middleware 
    //now we can request req.auth as a boolean in auth() and implement logic for handling 
    //authorization across every route in the app 

    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],//from authjs 
  }