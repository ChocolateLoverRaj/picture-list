import Head from 'next/head'
import 'antd/dist/antd.css'
import GlobalContext from '../contexts/Global'
import useLocalStorage from 'use-local-storage'

const App = props => {
  const { Component, pageProps } = props

  const listsState = useLocalStorage('lists', [])
  
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
