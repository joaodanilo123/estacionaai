import Link from "next/link";
import { UrlObject } from "url";

interface NavButtonProps {
    href: string | UrlObject,
    children: any
}

function NavButton(props: NavButtonProps) {
    return (
        <Link href={props.href}
            className="text-center flex justify-center  h-full max-w-[15%] min-w-[10%] hover:text-neutral-300 mx-2">
            <div className="my-auto">{props.children}</div>
        </Link>
    );
}

export default function NavBar() {
    return (
        <nav className="flex flex-row w-full h-20 bg-blue-600">
            <header className="block m-2 text-2xl font-bold p-4 flex-1 text-left">
                <h1><Link href="/">EstacionAí</Link></h1>
            </header>

            <NavButton href="/pontos">Pontos</NavButton>
            <NavButton href="/tickets">Tickets</NavButton>
        </nav>
    )
}