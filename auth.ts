import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
})

// In production, AUTH_SECRET is a required environment variable 
// - if not set, NextAuth.js will throw an error. See MissingSecretError for more details.
//https://authjs.dev/reference/core/errors#missingsecret


// You can also initialize NextAuth.js lazily (previously known as advanced intialization), 
// which allows you to access the request context in the configuration in some cases, 
// like Route Handlers, Middleware, API Routes or getServerSideProps. 
// This is useful if you want to customize the configuration based on the request, for example, 
// to add a different provider in staging/dev environments.

// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// export const { handlers, auth } = NextAuth(req => {
//  if (req) {
//   console.log(req) // do something with the request
//  }
//  return { providers: [ GitHub ] }
// })