import { Html, Head, Main, NextScript } from 'next/document'
import NavBar from '../components/NavBar'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='bg-neutral-200 text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}