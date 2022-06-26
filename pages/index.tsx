import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* sidebar */}
        <Sidebar />
        {/* center */}
      </main>

      <div> {/* player */} </div>
          </div>
        )
      }

export default Home
