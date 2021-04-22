import Head from 'next/head'
import 'antd/dist/antd.css'
import GlobalContext from '../contexts/Global'
import useLocalStorage from 'use-local-storage'
import Nav from '../components/Nav'
import 'react-html5-camera-photo/build/css/index.css'

const App = props => {
  const { Component, pageProps } = props

  const listsState = typeof window !== 'undefined'
    ? useLocalStorage('lists', [])
    : [[]]
  
  return (
    <GlobalContext.Provider
      value={listsState}
    >
      <Head>
        <link rel='manifest' href='app.webmanifest' />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <footer>
        Made by Banana Custom Apps
      </footer>
    </GlobalContext.Provider>
  )
}

export default App
