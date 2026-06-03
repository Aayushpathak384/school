import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import '@/styles/globals.css'

const WHATSAPP_NUMBER = '917667456367'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="KIRAN PUBLIC SCHOOL — CBSE Based English Medium School in Barharwa, Siwan. Classes from Nursery to Class VIII."
        />
        <meta name="theme-color" content="#1535cc" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="font-sans">
        <Header />
        <main className="min-h-screen">
          <Component {...pageProps} />
        </main>
        <Footer />
        {/* Floating WhatsApp button */}
        <WhatsAppButton
          phone={WHATSAPP_NUMBER}
          message="Hi, I would like to enquire about KIRAN PUBLIC SCHOOL. Please share admission details."
        />
      </div>
    </>
  )
}
