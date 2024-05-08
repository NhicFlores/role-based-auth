//due to prisma's incompatability with edge, this is the file 
//that triggers the nextjs middleware 
//while auth.ts uses prisma adapter 
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import type { NextAuthConfig } from "next-auth"

// -Create an auth.config.ts file which exports an object containing 
// your Auth.js configuration options. You can put all common configuration 
// here which does not rely on the adapter. 
// -Notice this is exporting a configuration object only, 
// we’re not calling NextAuth() here.

export default { 
    providers: [GitHub, Google], 
} satisfies NextAuthConfig


// from edge compatibility section 
// https://authjs.dev/getting-started/migrating-to-v5 

// While Auth.js strictly uses standard Web APIs (and thus can run in any 
// environment that supports them), some libraries or ORMs 
// (Object-Relational Mapping) packages that you rely on might not be ready yet. 
// In this case, you can split the auth configuration into multiple files.

// Auth.js supports two session strategies. When you are using an adapter, 
// it will default to the database strategy. Unless your database and its 
// adapter is compatible with the Edge runtime/infrastructure, you will not be 
// able to use the "database" session strategy.

// So for example, if you are using an adapter that relies on an ORM/library that
// is not yet compatible with Edge runtime(s) below is an example where we 
// force the jwt strategy and split up the configuration so the library 
// doesn’t attempt to access the database in edge environments, 
// like in the middleware.