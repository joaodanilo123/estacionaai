import { prisma } from "../../util/db";
import * as bcrypt from 'bcrypt'
import { User } from "@prisma/client";

interface UserLoginParams {
    email: string,
    password: string
}

export async function login(credentials: UserLoginParams) {
    
    const user: User | null = await prisma.user.findUnique({
        where: {
            email: credentials.email
        }
    });

    if (user) {
        const match = await bcrypt.compare(credentials.password, user.password);
        if (match) {
            return {
                id: user.id,
                name: user.name,
                email: user.email
            };
        }
    }

    return false;
    
}
