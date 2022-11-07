import NavBar from '../components/NavBar'
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body className='bg-slate-800 text-white'>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
