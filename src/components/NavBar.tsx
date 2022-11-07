import { HtmlProps } from "next/dist/shared/lib/html-context";
import Link from "next/link";
import { PropsWithChildren } from "react";

function NavButton(props: any) {
    return (
        <Link href={props.href}
            className="text-center flex justify-center  h-full max-w-[15%] min-w-[10%] hover:text-neutral-300">
            <div className="my-auto">{props.children}</div>
        </Link>
    );
}

export default function NavBar() {
    return (
        <nav className="flex flex-row w-full h-20 bg-blue-600">
            <header className="block m-2 text-2xl font-bold p-4 flex-1 text-left">
                <h1><Link href="/">EstacionaAi</Link></h1>
            </header>

            <NavButton href="/pontos">Pontos</NavButton>
            <NavButton href="/tickets">Ticket</NavButton>
            <NavButton href="/pagamentos">Pagamentos</NavButton>
            <NavButton href="/usuarios">Usuarios</NavButton>
        </nav>
    )
}