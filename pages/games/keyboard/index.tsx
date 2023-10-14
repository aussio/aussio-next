import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { initApp, start, reset, setUpSprites } from '../../../components/games/keyboard';

const Home: NextPage = () => {

  const [render, rerender] = useState(false);
  
  useEffect(()=> {
    const element = document.getElementById("example")
    const app = initApp(element)
    element.appendChild(app.view)
    start()
  }, [])
  
  useEffect(()=> {
    setUpSprites()
  }, [render])

  return (
    <>
      <Head>
        <title>Some games I've made</title>
      </Head>
      <Link
        href="/games"
        className="mt-5 ml-5 block first-letter:block w-1/4 pointer rounded-lg border text-center border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
        >
        🔙 Games
      </Link>
      <main className="mx-auto h-screen max-w-[1960px] p-4 text-white">
        <h1>Arrow keys to move</h1>
        <div className="w-full h-3/4 border-dashed border-2 border-sky-500" id="example"/>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {reset()}}>Reset</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {rerender(!render)}}>Start</button>
      </main>
    </>
  )
}

export default Home