import { db } from "@/lib/db";
import { User } from "@prisma/client";

export async function getUserByEmail<User>(email: string){
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });
        return user as User;
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
        //const test = await db.$queryRaw<User>``
        return user as User;
    } catch (error) {
        return {error: "Database Error: failed to get user"};
    }
};