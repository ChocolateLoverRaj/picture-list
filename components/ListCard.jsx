import GlobalContext from '../contexts/Global'
import { useContext } from 'react'
import Link from 'next/link'
import {
  Card,
  Popconfirm
} from 'antd'
import {
  EyeOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import styles from '../styles/ListCard.module.css'

const ListCard = props => {
  const { index, name } = props

  const [lists, setLists] = useContext(GlobalContext)

  const handleConfirm = () => {
    setLists([
      ...lists.slice(0, index),
      ...lists.slice(index + 1)
    ])
  }

  return (
    <Card
      className={styles.card}
      title={name}
      extra={
        <Link 
          href={`/lists/${name}`}
        >
          <EyeOutlined />
        </Link>
      }
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
}

export default ListCard
