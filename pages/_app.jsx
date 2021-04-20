import Head from 'next/head'
import 'antd/dist/antd.css'
import GlobalContext from '../contexts/Global'

const App = props => {
  const { Component, pageProps } = props

  const listsState = useLS('lists', [])
  
  return (
    <>
      <Head>
        <link rel='manifest' href='app.webmanifest' />
      </Head>
      <GlobalContext.Provider
       value={listsState}
      >
        <Component {...pageProps} />
      </GlobalContext.Provider>
      <footer>
        Made by Banana Custom Apps
      </footer>
    </>
  )
}

export default App
