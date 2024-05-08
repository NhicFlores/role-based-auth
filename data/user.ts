import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        return user;
    } catch (error) {
        return {error: "email already in use"}
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        });
        return user;
    } catch (error) {
        return {error: "Database Error: failed to get user"};
    }
};