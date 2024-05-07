import { z } from "zod";
import { RegisterSchema } from "@/schema";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function register(formFields:z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(formFields);

    if(!validatedFields.success) {
        return { error: "invalid fields"};
    }

    const { email, name, password, confirm_password } = validatedFields.data

    if(password !== confirm_password) {
        return { error: "passwords do not match! "};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: {
            email,
        }
    });

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    // NOTE TODO: send verification token email 

    return {success: "User created!"};
    
}