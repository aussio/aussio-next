import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
    <main className="w-full flex-col justify-center">
      <GameLink
        link={"/games/moving-rockets"} 
        imgUrl={"https://res.cloudinary.com/https-auss-io/image/upload/v1697251499/auss.io/games/mrcjg6rf6usm9npzyrv4.png"} 
        description={"🚀 Simplest setup connected to a React button"} 
        />
      <GameLink
        link={"/games/keyboard"} 
        imgUrl={"https://res.cloudinary.com/https-auss-io/image/upload/v1697251499/auss.io/games/gsmgjsxv6dhyhcjwyg0o.png"} 
        description={"⌨️ Keyboard movement"} 
        />
    </main>
    </>
  )
}

function GameLink({link, imgUrl, description}) {
  return (
    <Link
      href={link}
      className="flex flex-col items-center mx-auto mt-5 mb-5 block w-1/2 pointer rounded-lg border text-center border-white bg-white/10 px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/5 text-white md:mt-4"
    >
      <Image
        alt=""
        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
        style={{ transform: 'translate3d(0, 0, 0)' }}
        src={imgUrl}
        width={500}
        height={300}
        sizes="(max-width: 640px) 100vw,
        (max-width: 1280px) 50vw,
        (max-width: 1536px) 33vw,
        25vw"
      />
      <p className="my-5">{description}</p>
    </Link>
  )
}