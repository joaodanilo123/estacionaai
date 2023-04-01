import { prisma } from "../../global/db";
import * as bcrypt from 'bcrypt'
import { User } from "@prisma/client";
import { errorMessage } from "../../global/globalErrorMessage";

interface UserRegistrationParams {
    name: string,
    email: string,
    cpf: string,
    phone: string,
    password: string,
    address: string
}

export async function register(newUser: UserRegistrationParams) {

    try {
        const searchEmail = await prisma.user.count({
            where:
            {
                OR: [
                    {
                        email: newUser.email
                    },
                    {
                        cpf: newUser.cpf
                    }
                ]
            }
        });

        console.log(searchEmail);

        if (searchEmail == 0) {

            const saltRounds = 10;
            const password: string = await bcrypt.hash(newUser.password, saltRounds);

            const user: User = await prisma.user.create({
                data: {
                    name: newUser.name,
                    email: newUser.email,
                    cpf: newUser.cpf,
                    phoneNumber: newUser.phone,
                    address: newUser.address,
                    role: "costumer",
                    password,
                }
            });

            console.log(user);

            return user.id

        } else {
            return errorMessage("Email ou CPF já cadastrados");
        }

    } catch (error) {
        console.log(error);
        return errorMessage("Erro ao cadastrar usuário");
    }

}
