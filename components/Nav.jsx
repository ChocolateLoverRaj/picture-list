import { useRouter } from 'next/router'
import { Breadcrumb, Menu } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import GlobalContext from '../contexts/Global'
import { useContext } from 'react'

const headers = new Map()
  .set('/lists', 'Lists')
  .set('/pictures', 'Pictures')

const menu = (
  <Menu>
    {[...headers].map(([page, header]) => (
      <Menu.Item key={page}>
        <Link href={page}>
          {header}
        </Link>
      </Menu.Item>
    ))}
  </Menu>
)

const Nav = () => {
  const { 
    route, 
    query: { name } 
  } = useRouter()
  const [lists] = useContext(GlobalContext).lists

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Image src='/icon-192px.png' width={20} height={20} />
      </Breadcrumb.Item>
      <Breadcrumb.Item overlay={menu}>
        {headers.get(
          `/${route.split('/')[1]}`
        )}
      </Breadcrumb.Item>
      {route.startsWith('/lists') && (
        <Breadcrumb.Item
          overlay={
            <Menu>
              {lists.map(({ name }) => (
                <Menu.Item key={name}>
                  <Link 
                    href={`/lists/${name}`}
                  >
                    {name}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          {name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}

export default Nav
