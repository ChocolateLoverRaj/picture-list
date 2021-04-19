import Head from 'next/head'
import { Breadcrumb, Menu } from 'antd'
import Link from 'next/link'

const menu = (
  <Menu>
    <Menu.Item>
      <Link href='/'>
        Lists
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link href='/pictures'>
        Pictures
      </Link>
    </Menu.Item>
  </Menu>
)

const App = () => {
  return (
    <>
      <Head>
        <title>Picture List</title>
      </Head>
      <h1>Picture List</h1>
      <Breadcrumb>
        <Breadcrumb.Item>
          <img src='/icon-192px.png' width={50} height={50} />
        </Breadcrumb.Item>
        <Breadcrumb.Item overlay={menu}>
          <a href=''>Lists</a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
}

export default App
