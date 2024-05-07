import { z } from "zod";
import { RegisterSchema } from "@/schema";

export async function register(formData:z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(formData);

    if(!validatedFields.success) {
        return { error: "invalid fields"};
    }

    return {success: "registraion email sent"}
    
}