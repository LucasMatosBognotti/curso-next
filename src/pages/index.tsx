import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

import { client } from '../lib/prismic';
import SEO from '../components/SEO';
import { Title } from '../styles/pages/Home';



interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  
  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        shouldExcludeTitleSufflix
        image="computer.jpg"
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(product => (
            <li key={product.id}>
              <Link href={`/catalog/products/${product.uid}`}>
                <a>
                  {PrismicDom.RichText.asText(product.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
};


export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}
