import Link from 'next/link'

export default function Home() {
  return (
    <>
    <main className="w-full flex-col justify-center">
      <Link
        href="/games/moving-rockets"
        className="mx-auto mt-5 mb-5 block w-1/2 pointer rounded-lg border text-center border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
        >
        🚀 Simplest setup connected to a React button
      </Link>
      <Link
        href="/games/keyboard"
        className="mx-auto mt-5 mb-5 block w-1/2 pointer rounded-lg border text-center border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
        >
        ⌨️ Keyboard movement
      </Link>
    </main>
    </>
  )
}
