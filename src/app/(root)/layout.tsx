import React from 'react'
import '../../styles/globals.css'

interface RootLayoutProps {
  children: React.ReactNode,
  type: React.ButtonHTMLAttributes<any>
}


export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html>
      <head></head>
      <body className='bg-neutral-200 text-white'>{children}</body>
    </html>
  )
}
