import { useRouter } from 'next/router'
import { Breadcrumb, Menu } from 'antd'
import Link from 'next/link'
import Image from 'next/image'

const headers = new Map()
  .set('/', 'Lists')
  .set('/pictures', 'Pictures')

const menu = (
  <Menu>
    {[...headers].map(([page, header]) => (
      <Menu.Item>
      <Link href={page.slice(1)}>
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
        <Image src='/icon-192px.png' width={50} height={50} />
      </Breadcrumb.Item>
      <Breadcrumb.Item overlay={menu}>
        {headers.get(route)}
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default Nav
