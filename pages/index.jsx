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

const App = () => {
  const [lists, setLists] = useLS('lists', [])

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
          >
            <NewList />
          </Empty>
        )}
    </>
  )
}

export default App
