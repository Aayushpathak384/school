import Head from 'next/head'
import Container from '@/components/layout/Container'
import Button from '@/components/common/Button'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - School Website</title>
      </Head>

      <Container size="md" className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button label="← Go Home" href="/" size="lg" />
          <Button label="Contact Us" href="/contact" variant="secondary" size="lg" />
        </div>
      </Container>
    </>
  )
}
