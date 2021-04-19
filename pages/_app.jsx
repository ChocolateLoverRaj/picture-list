import Head from 'next/head'

const App = props => {
  const { Component, pageProps } = props
  
  return (
    <>
      <Head>
        <link rel='manifest' href="app.webmanifest" />
      </Head>
      <Component {...pageProps} />
      <footer>
        Made by Banana Custom Apps
      </footer>
    </>
  )
}

export default App
