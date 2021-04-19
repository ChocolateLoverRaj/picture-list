import { useRouter } from 'next/router'
import { Breadcrumb, Menu } from 'antd'
import Link from 'next/link'

const headers = new Map()
  .set('/', 'Lists')
  .set('/pictures', 'Pictures')

const menu = (
  <Menu>
    {[...headers].map(([page, header]) => (
      <Menu.Item>
      <Link href={`.{page}`}>
        {header}
      </Link>
    </Menu.Item>
    ))}
  </Menu>
)

const Nav = () => {
  const { route } = useRouter()

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <img src='/icon-192px.png' width={50} height={50} />
      </Breadcrumb.Item>
      <Breadcrumb.Item overlay={menu}>
        <a href=''>{headers.get(route)}</a>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default Nav
