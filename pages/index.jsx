import Head from 'next/head'
import Nav from '../components/Nav'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Search } = Input

const App = () => {
  return (
    <>
      <Head>
        <title>Picture List</title>
      </Head>
      <h1>Picture List</h1>
      <Nav />
      <Search />
      <Button>New List</Button>
    </>
  )
}

export default App
