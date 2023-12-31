import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Modal from '../components/Modal'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import Github from '../components/Icons/Github'
import Linkedin from '../components/Icons/Linkedin'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter()
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {``
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      <Head>
        <title>Austin Curtis personal website</title>
        <meta
          property="og:image"
          content="https://res.cloudinary.com/https-auss-io/image/upload/v1593732990/auss.io/home_gallery/UNADJUSTEDNONRAW_thumb_5e9_mpfken.jpg"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/https-auss-io/image/upload/v1593732990/auss.io/home_gallery/UNADJUSTEDNONRAW_thumb_5e9_mpfken.jpg"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 py-20 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-white/10 px-6 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight">
            <h1 className="mb-4 text-base font-bold uppercase tracking-widest">
              Hey, I'm Austin
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              I'm a doer, but love brainstorming as a team.
            </p>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              I believe compassionate transparency is the key to happy and successful relationships.
            </p>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
               I'll always evangelize that writing tests and documentation make you go faster.
            </p>
            <a
              className="pointer z-10 my-3 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
              href="https://res.cloudinary.com/https-auss-io/image/upload/v1691621580/austin-curtis-resume.pdf"
              target="_blank"
              rel="noreferrer"
              >
              Resume
            </a>
            <div className="flex space-x-5 my-3">
              <Link
                href="https://github.com/aussio"
                target="_blank"
              >
                <Github />
              </Link>
              <Link
                href="https://www.linkedin.com/in/austin-curtis-engineer/"
                target="_blank"
                >
                <Linkedin />
              </Link>
            </div>
          </div>
          <Link
            href="/games"
            className="mb-5 block w-full pointer rounded-lg border text-center border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
            >
            Games and experiments I've made
          </Link>
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Austin Curtis photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.jpg`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
      </footer>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  let reducedResults: ImageProps[] = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image)
  })
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}
