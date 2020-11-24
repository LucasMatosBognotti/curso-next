import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  shouldExcludeTitleSufflix?: boolean;
  shouldIndexPage?: boolean;
}

export default function SEO({ title, description, image, shouldExcludeTitleSufflix = false, shouldIndexPage = true }: SEOProps) {
  const pageTitle = `${title} ${!shouldExcludeTitleSufflix ? '| DevCommnerce' : ''}`;
  const pageImage = image ? `http://localhost:3000/${image}` : null;

  return (
    <Head>
      <title>{pageTitle}</title>

      { description && <meta name="description" content={description} /> }
      { pageImage && <meta name="image" content={pageImage} /> }

      { !shouldIndexPage && <meta name="robots" content="noindex, nofollow" /> }
    </Head>
  );
}
