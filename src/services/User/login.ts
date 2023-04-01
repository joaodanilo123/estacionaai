import { prisma } from "../../global/db";
import * as bcrypt from 'bcrypt'
import { User } from "@prisma/client";
import { errorMessage } from "../../global/globalErrorMessage";

interface UserLoginParams {
    email: string,
    password: string
}

export async function login(credentials: UserLoginParams) {
    try {
        const user: User | null = await prisma.user.findUnique({
            where: {
                email: credentials.email
            }
        });

        if (user) {
            const match = await bcrypt.compare(credentials.password, user.password);
            if (match) {
                return {
                    success: true,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                };
            }
        }
        
        return errorMessage("Email ou senha incorretos");

    } catch (error) {
        console.log(error);
        return errorMessage("Erro ao realizar login");
    }
}
