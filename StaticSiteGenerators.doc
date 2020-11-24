import { GetStaticProps } from 'next';

interface IProduct {
  id: string;
  title: string;
}

interface Top10Props {
  products: IProduct[];
}

export default function Top10({ products }: Top10Props) {
  return (
    <div>
      <h1>Top 10</h1>

      <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.title}
            </li>
          ))}
        </ul>
    </div>
  );
}

/* Static Site Generators => Site estaticos */

export const getStaticProps: GetStaticProps<Top10Props> = async () => {
  const response = await fetch('http://localhost:3333/products');
  
  const products = await response.json();

  return {
    props: {
      products
    },
    revalidate: 5, /* Atualiza os dados da pagina estatica a cada 5 segundos */
  }
}
