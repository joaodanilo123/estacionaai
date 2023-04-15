'use client';

import { FormEvent, useState } from "react";
import { Button } from "../../components/control/Button";
import { Input } from "../../components/control/Input";
import Image from "next/image";
import LoadingSVG from "../../../../public/loading.svg"
import { useFormSubmission } from "../../hooks/useFormSubmission";

export function SignupForm() {

    const url = "/api/signup";

    const form = useFormSubmission(url, 'POST'); 

    return (
        <>
            {form.loading && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                    <Image src={LoadingSVG} alt="loading" className="w-10 h-10 animate-spin text-white" />
                </div>
            )}

            <form method="post" onSubmit={form.handleFormSubmit}
                className="bg-white text-black px-20 py-10 [&>*]:my-4 rounded-md mt-10">

                <h2 className="text-2xl font-medium">Cadastro de usuário</h2>
                {form.errorMessage && (
                    <div className="text-center bg-red-600 text-white p-2 font-medium rounded-md">
                        <span>{form.errorMessage}</span>
                    </div>
                )}

                <Input title="Nome" name="name" id="name" required />
                <Input title="Email" name="email" id="email" type="email" required />
                <fieldset className="flex">
                    <Input title="Phone" name="phone" id="phone" required />
                    <Input title="CPF" name="cpf" id="cpf" required />
                </fieldset>
                <fieldset className="flex">
                    <Input title="Senha" type="password" name="password" id="password" required />
                    <Input title="Confirmar Senha" type="password" name="confirmPassword" id="confirmPassword" required />
                </fieldset>

                <Button type="submit" className="w-full">Cadastrar</Button>
            </form>
        </>
    );
}
