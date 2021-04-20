import Head from 'next/head'
import Nav from '../components/Nav'
import { 
  Input, 
  Button, 
  Empty,
  Card,
  Popconfirm
} from 'antd'
import { 
  SearchOutlined,
  DeleteOutlined
} from '@ant-design/icons'
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
        ? (
          lists.map(({ name }, i) => {
            const handleConfirm = () => {
              setLists([
                ...lists.slice(0, i),
                ...lists.slice(i + 1)
              ])
            }

            return (
              <Card
                key={name} 
                title={name} 
                actions={[
                  <Popconfirm
                    title='Are you sure you want to delete this list?'
                    okText='Yes'
                    cancelText='No'
                    onConfirm={handleConfirm}
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                ]}
              />
            )
          ))
        )
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
