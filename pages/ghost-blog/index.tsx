import ghostClient from 'utils/ghost-client'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import type { GetStaticProps, NextPage } from 'next'
import type { IGetPlaiceholderReturn } from 'plaiceholder'
import type { PostOrPage } from '@tryghost/content-api'

interface PostOrPageImgPlaiceholder extends PostOrPage {
  featureImageProps: IGetPlaiceholderReturn | null
}
interface BlogPageProps {
  posts: PostOrPageImgPlaiceholder[]
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  return (
    <div className="my-3 px-3">
      <main className="grid grid-cols-3 gap-x-3 gap-y-6">
        {posts.map((post) => (
          <article key={post.id}>
            {post.feature_image && post.featureImageProps && (
              <div className="relative h-[300px]">
                <Image
                  src={post.featureImageProps.img.src}
                  placeholder="blur"
                  blurDataURL={post.featureImageProps.base64}
                  layout="fill"
                  objectFit="cover"
                  alt={post.title}
                />
              </div>
            )}
            <h1 className="text-lg font-medium mb-1 mt-3">{post.title}</h1>
          </article>
        ))}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch posts
  const rawPosts = await ghostClient.posts.browse({
    limit: 'all',
  })

  if (!rawPosts) {
    return {
      notFound: true,
    }
  }

  // Process images
  const posts = await Promise.all(
    rawPosts.map(async (post) => {
      return {
        featureImageProps: post.feature_image
          ? await getPlaiceholder(post.feature_image)
          : null,
        ...post,
      } as PostOrPageImgPlaiceholder
    })
  )

  return {
    props: {
      posts,
    },
  }
}

export default BlogPage
