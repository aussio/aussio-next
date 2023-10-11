import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Home page for Austin Curtis. Lots o' baby pictures, too."
          />
          <meta property="og:site_name" content="auss.io" />
          <meta
            property="og:description"
            content="Home page for Austin Curtis. Lots o' baby pictures, too."
          />
          <meta property="og:title" content="Austin Curtis home page" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Austin Curtis home page" />
          <meta
            name="twitter:description"
            content="Home page for Austin Curtis. Lots o' baby pictures, too."
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
