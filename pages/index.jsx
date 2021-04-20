import Head from 'next/head'
import Nav from '../components/Nav'
import { 
  Input, 
  Button, 
  Empty
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import useLS from 'use-local-storage'
import NewList from '../components/NewList'
import { useState, useContext } from 'react'
import GlobalContext from '../contexts/Global'

const App = () => {
  const [lists, setLists] = useContext(GlobalContext)

  return (
    <>
      <Head>
        <title>Picture List</title>
      </Head>
      <h1>Picture List</h1>
      <Nav />
      <Input
        prefix={<SearchOutlined />}
        addonAfter={<NewList />}
      />
      {lists.length > 0
        ? 'List coming soon'
        : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='No Lists'
          >
            <NewList />
          </Empty>
        )}
    </>
  )
}

export default App
