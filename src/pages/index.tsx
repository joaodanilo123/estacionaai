import '../styles/globals.css'

import Link from "next/link";

import Map from "../components/Map";
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />  
      <main className='flex flex-col justify-center m-auto p-4'> 
        <section className='w-5/6 mx-auto bg-gray-700 border-gray-700 border-8 rounded-xl'>
          <Map />
        </section>
      </main>
    </>

  );
}
