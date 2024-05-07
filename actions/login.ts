'use server';
import { LoginSchema, RegisterSchema } from "@/schema";
import { z } from "zod";

 

export const login = async (formData: z.infer<typeof LoginSchema>) => {
    console.log("in server action: server side");
    console.log(formData);

    const validatedFields = LoginSchema.safeParse(formData);

    if(!validatedFields.success) {
        return { error: "invalid fields"};
    }

    return {success: "email sent"};
}
