/**
 * an array of routes that are accessible to the public 
 * these routes do not require authentication 
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
]

/**
 * an array of routes that are inaccessible to the public 
 * these routes require authentication 
 * @type {string[]}
 */
export const privateRoutes = [
    "",
]

/**
 * an array of routes used for authentication
 * these routes will redirect logged in users to /settings 
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/register",
]

/**
 * The prefix for API authentication routes 
 * routes that start with this prefix are used 
 * for API authentication purposes 
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * the default redirect path after logging in 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"