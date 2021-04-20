import Head from 'next/head'
import Nav from '../components/Nav'
import { 
  Input, 
  Button, 
  Empty,
  Modal
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import useLS from 'use-local-storage'
import NewList from '../components/NewList'
import { useState } from 'react'

const App = () => {
  const [lists, setLists] = useLS('lists', [])
  const [creating, setCreating] = useState(false)

  const handleCreate = () => {
    setCreating(true)
  }

  const handleOk = () => {
    alert('Create coming soon')
  }

  const handleCancel = () => {
    setCreating(false)
  }

  return (
    <>
      <Head>
        <title>Picture List</title>
      </Head>
      <h1>Picture List</h1>
      <Nav />
      <Input
        prefix={<SearchOutlined />}
        addonAfter={
          <NewList 
            onClick={handleCreate}
          />
        }
      />
      {lists.length > 0
        ? 'List coming soon'
        : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='No Lists'
          >
            <NewList 
              onClick={handleCreate}
            />
          </Empty>
        )}
      <Modal 
        title='New List'
        visible={creating}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Form coming soon
      </Modal>
    </>
  )
}

export default App
