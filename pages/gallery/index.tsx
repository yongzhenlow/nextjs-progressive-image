import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import type { InferGetStaticPropsType, NextPage } from 'next'

const GalleryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  imagesProps,
}) => {
  return (
    <div className="my-3 px-3">
      <main className="grid grid-cols-3 gap-3">
        {imagesProps.map((imagesProp) => (
          <div className="relative h-[300px]" key={imagesProp.img.src}>
            <Image
              src={imagesProp.img.src}
              placeholder="blur"
              blurDataURL={imagesProp.base64}
              layout="fill"
              objectFit="cover"
              alt={imagesProp.img.src}
            />
          </div>
        ))}
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  // Fetch images
  const raw = await fetch('https://shibe.online/api/shibes?count=10')
  const data: string[] = await raw.json()

  // Process images
  const imagesProps = await Promise.all(
    data.map(async (src) => await getPlaiceholder(src))
  )

  return {
    props: {
      imagesProps,
    },
  }
}

export default GalleryPage
