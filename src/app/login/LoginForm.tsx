'use client'

import { Button } from "../../components/control/Button";
import { Input } from "../../components/control/Input";
import Image from "next/image";
import LoadingSVG from "../../../../public/loading.svg"
import { useFormSubmission } from "../../hooks/useFormSubmission";

export function LoginForm() {

    const url = "/api/user/login";

    const form = useFormSubmission(url, 'POST');

    return (
        <>
            {form.loading && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                    <Image src={LoadingSVG} alt="loading" className="w-10 h-10 animate-spin text-white" />
                </div>
            )}

            <form onSubmit={form.handleFormSubmit}
                className="bg-white text-black px-5 py-10 [&>*]:my-4 rounded-md mt-10">
                <h2 className="text-2xl font-medium text-center">Entre na sua conta</h2>

                {form.errorMessage && (
                    <div className="text-center bg-red-600 text-white p-2 font-medium rounded-md">
                        <span>Usuário ou senha incorretos</span>
                    </div>
                )}

                <Input type="email" title="Email" name="email" id="email" required />
                <Input type="password" title="Senha" name="password" id="password" required />
                <Button title="Login" type="submit" className="w-full">Login</Button>
            </form>
        </>

    );
}
