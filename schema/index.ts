//all schemas will go here
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'please enter a valid email address'
    }),
    //depending on the system, you maybe shouldn't enfore the min on login, in case 
    //there are old users that have a shorter password. it should be safe enough 
    //to only enfore it on register 
    password: z.string().min(6, {
        message: 'password must be at least 6 characters long'
    }),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'please enter a valid email address'
    }),
    name: z.string().min(1, {
        message: 'please enter your name'
    }),
    password: z.string().min(6, {
        message: 'password must be at least 6 characters long'
    }),
    confirm_password: z.string().min(6, {
        message: "passwords don't match"
    }),
})