import { Map } from "../../components/client/Map/Map"

export default async function HomePage() {

    return <>
      <main className='flex flex-col justify-center m-auto p-4'> 
        <section className='w-full mx-auto bg-gray-700 border-gray-700 border-8 rounded-xl'>
          <Map />
        </section>
      </main>
    </>

}