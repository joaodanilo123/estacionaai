import { prisma } from "../../../global/db"
import * as bcrypt from 'bcrypt'
import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { errorMessage } from '../../../global/globalErrorMessage';

interface UserLoginParams {
    email: string,
    password: string
}

export async function login(userLogin: UserLoginParams) {
    try {

        const user: User | null = await prisma.user.findUnique({ where: { email: userLogin.email } });

        if (!user) {
            return errorMessage("Email não cadastrado");
        }

        const match = await bcrypt.compare(userLogin.password, user.password);

        if (!match) {
            return errorMessage("Senha incorreta");
        }

        const secret = process.env.JWT_SECRET

        if(secret){
            const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
            return { success: true, token };
        } else throw new Error();
        
    } catch (error) {
        console.log(error);
        return errorMessage("Erro ao fazer login");
    }
}
