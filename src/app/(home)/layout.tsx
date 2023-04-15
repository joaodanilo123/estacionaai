import { ReactNode } from 'react'
import NavBar from '../../components/server/NavBar'

interface DefaultLayoutProps {
    children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <NavBar />
            {children}
        </>          
    )
}