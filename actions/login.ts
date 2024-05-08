'use server';
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, RegisterSchema } from "@/schema";
import { AuthError } from "next-auth";
import { z } from "zod";

 

export const login = async (formData: z.infer<typeof LoginSchema>) => {
    console.log("in server action: server side");
    console.log(formData);

    const validatedFields = LoginSchema.safeParse(formData);

    if(!validatedFields.success) {
        return { error: "invalid fields"};
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"}
                default:
                    return {error: "Something went wrong!"}
            }
        }
        throw error;
    }
}
