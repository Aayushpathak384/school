import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Meta */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1535cc" />

        {/* Open Graph defaults */}
        <meta property="og:site_name" content="KIRAN PUBLIC SCHOOL" />
        <meta property="og:locale" content="en_IN" />

        {/* Schema.org — EducationalOrganization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'KIRAN PUBLIC SCHOOL',
              description:
                'KIRAN PUBLIC SCHOOL — CBSE Based English Medium School offering classes from Nursery to Class VIII in Barharwa, Siwan, Bihar.',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kiranpublicschool.vercel.app',
              telephone: '+91-9065104078',
              email: '8541064924suraj@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Pachpakari Road, Barharwa',
                addressLocality: 'Siwan',
                addressRegion: 'Bihar',
                postalCode: '845418',
                addressCountry: 'IN',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Classes Offered',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Course', name: 'CBSE Nursery to Class VIII' },
                  },
                ],
              },
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
