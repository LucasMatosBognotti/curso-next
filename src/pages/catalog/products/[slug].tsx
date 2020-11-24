import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

import { client } from '../../../lib/prismic';

interface ProductsProps {
  product: Document;
}

export default function Products({ product }: ProductsProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando....</p>
  }

  return (
    <div>
      <h1>
        {PrismicDom.RichText.asText(product.data.title)}
      </h1>

      <img src={product.data.thumbnail.url} width="300" alt=""/>

      <div dangerouslySetInnerHTML={{ __html: PrismicDom.RichText.asHtml(product.data.description) }}></div>

      <p>Price: {product.data.price}</p>

    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true, /* Se a rota nao foi gerada no momento da buil, ela gera de forma automatica */
  }
}

export const getStaticProps: GetStaticProps<ProductsProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  
  return {
    props: {
      product
    },
    revalidate: 10,
  }
}
