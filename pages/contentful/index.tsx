import contentfulClient from 'utils/contentful-client'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import type { InferGetStaticPropsType, NextPage } from 'next'
import type { Options } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

const renderOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imgBlurData = node.data.target.fields.file.imgBlurData

      return (
        <div className="relative">
          <Image
            {...imgBlurData.img}
            alt={node.data.target.fields.description}
            placeholder="blur"
            blurDataURL={imgBlurData.base64}
          />
        </div>
      )
    },
  },
}

interface PageFields {
  title: string
  slug: string
  richTextBody: Document
}

const ContentfulPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ page }) => {
  return (
    <main className="container mx-auto">
      <article>
        <h1 className="text-2xl my-10">{page.fields.title}</h1>
        <div>
          {documentToReactComponents(page.fields.richTextBody, renderOptions)}
        </div>
      </article>
    </main>
  )
}

export const getStaticProps = async () => {
  const page = await contentfulClient.getEntry<PageFields>(
    '53yJ05JcurUI5p9NA1FCrh'
  )

  // Add blur placeholder data to rich text body for images
  for (const node of page.fields.richTextBody.content) {
    if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
      node.data.target.fields.file.imgBlurData = await getPlaiceholder(
        `https:${node.data.target.fields.file.url}`
      )
    }
  }

  return {
    props: {
      page,
    },
  }
}

export default ContentfulPage
