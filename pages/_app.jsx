import Head from 'next/head'
import 'antd/dist/antd.css'
import GlobalContext from '../contexts/Global'
import useLocalStorage from 'use-local-storage'
import Nav from '../components/Nav'
import 'react-html5-camera-photo/build/css/index.css'

const App = props => {
  const { Component, pageProps } = props

  const initialLists = []
  const listsState = typeof window !== 'undefined'
    ? useLocalStorage(
      'lists', 
      initialLists
    )
    : initialLists
  
  const initialPictures = {
    pictures: [],
    nextId: 0
  }
  const picturesState = typeof window !== 'undefined'
    ? useLocalStorage(
      'pictures', 
      initialPictures
    )
    : initialPictures
  
  return (
    <GlobalContext.Provider
      value={{ 
        lists: listsState,
        pictures: picturesState
      }}
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
