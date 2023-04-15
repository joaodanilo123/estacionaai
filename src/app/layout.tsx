import React from 'react'
import '../styles/globals.css'

interface RootLayoutProps {
  children: React.ReactNode
}


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-bt">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Estacionaai</title>
      </head>
      <body className='bg-neutral-200 text-white'>{children}</body>
    </html>
  )
}
