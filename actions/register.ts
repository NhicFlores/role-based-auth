'use server'

import { z } from "zod";
import { RegisterSchema } from "@/schema";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export async function register(formFields:z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(formFields);

    if(!validatedFields.success) {
        return { error: "invalid fields"};
    }

    const { email, name, password, confirm_password } = validatedFields.data

    console.log("------------------ CHECKING PASSWORDS ------------");
    if(password !== confirm_password) {
        console.log(password !== confirm_password)
        return { error: "passwords do not match! "};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

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