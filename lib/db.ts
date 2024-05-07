import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}
//nextjs hot reload initializes a new client every time we save a file and the hot reload triggers
//this causes warnings for the number of prisma clients initialized 
//globalThis is not affected by hot reload  
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;