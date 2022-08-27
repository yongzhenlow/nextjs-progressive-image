import Image from 'next/image'
import imageOne from 'public/image-one.jpeg'
import { getPlaiceholder } from 'plaiceholder'
import type { IGetPlaiceholderReturn } from 'plaiceholder'
import type { InferGetStaticPropsType, NextPage } from 'next'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  imageTwo,
  imageThree,
}) => {
  return (
    <div className="my-3 px-3">
      <h1 className="text-2xl mb-6">Progressive Image Loading</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <h2 className="text-lg mb-2">Statically Imported</h2>
          <div className="relative h-[300px]">
            <Image
              src={imageOne}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt="Statically imported image file"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg mb-2">Internal image URL</h2>
          <div className="relative h-[300px]">
            <Image
              src={imageTwo.img.src}
              placeholder="blur"
              blurDataURL={imageTwo.base64}
              layout="fill"
              objectFit="cover"
              alt="Internal image url"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg mb-2">External image URL</h2>
          <div className="relative h-[300px]">
            <Image
              src={imageThree.img.src}
              placeholder="blur"
              blurDataURL={imageThree.base64}
              layout="fill"
              objectFit="cover"
              alt="External image url"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const imagePaths = [
    '/image-two.jpeg',
    'https://source.unsplash.com/AF2tOJnGik0',
  ]

  const [imageTwo, imageThree]: IGetPlaiceholderReturn[] = await Promise.all(
    imagePaths.map(async (uri) => await getPlaiceholder(uri))
  )

  return {
    props: {
      imageTwo,
      imageThree,
    },
  }
}

export default Home
