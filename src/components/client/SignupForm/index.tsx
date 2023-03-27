'use client';

import { FormEvent, useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";


export function SignupForm() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCpf] = useState("");


    async function handleFormSubmit(ev: FormEvent) {
        ev.preventDefault();

        console.log({ email, password });
    }

    return (
        <form method="post" onSubmit={handleFormSubmit}
            className="bg-white text-black px-20 py-10 [&>*]:my-4 rounded-md mt-10">
            <h2 className="text-2xl font-medium">Cadastro de usuário</h2>
            <Input title="Nome" name="name" id="name" onChange={ev => { setName(ev.target.value) }} required />
            <Input title="Email" name="email" id="email" type="email" onChange={ev => { setEmail(ev.target.value) }} required />
            <div className="flex">
                <Input title="Phone" name="phone" id="phone" onChange={ev => { setPhone(ev.target.value) }} required />
                <Input title="CPF" name="cpf" id="cpf" onChange={ev => { setCpf(ev.target.value) }} required />
            </div>
            <div className="flex">
                <Input title="Senha" type="password" name="password" id="password" onChange={ev => { setPassword(ev.target.value) }} required />
                <Input title="Confirmar Senha" type="password" name="confirmPassword" id="confirmPassword" onChange={ev => { setConfirmPassword(ev.target.value) }} required />
            </div>

            <Button title="Cadastrar" type="submit" className="w-full" />
        </form>
    );
}
