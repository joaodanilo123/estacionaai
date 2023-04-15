import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function loginPage() {

    const signupPath = "/signup";

    return (
        <main className='flex flex-col justify-center items-center p-4 text-black'>
            <div className='w-full md:max-w-md'>
                <LoginForm />
                <footer className="bg-white mt-2 p-2 rounded-md text-center">
                    Não possui conta? <Link href={signupPath} className="text-blue-600">Cadastre-se</Link> 
                </footer>    
            </div>
        </main>
    )
}
