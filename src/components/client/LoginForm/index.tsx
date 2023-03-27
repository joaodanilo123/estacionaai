'use client';

import { FormEvent, useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";


export function LoginForm() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    async function handleFormSubmit(ev: FormEvent) {
        ev.preventDefault();

        console.log({ email, password });
    }

    return (
        <form method="post" onSubmit={handleFormSubmit}
            className="bg-white text-black px-20 py-10 [&>*]:my-4 rounded-md mt-10">
            <h2 className="text-2xl font-medium">Entre na sua conta</h2>
            <Input title="Email" name="email" id="email" onChange={ev => { setEmail(ev.target.value) }} />
            <Input title="Senha" name="password" id="password" onChange={ev => { setPassword(ev.target.value) }} />
            <Button title="Login" type="submit" className="w-full" />
        </form>
    );
}
