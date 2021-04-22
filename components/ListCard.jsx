import GlobalContext from '../contexts/Global'
import { useContext, useState } from 'react'
import Link from 'next/link'
import {
  Card,
  Popconfirm,
  Modal,
  message,
  Form
} from 'antd'
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons'
import styles from '../styles/ListCard.module.css'
import RenameForm from './RenameForm'

const ListCard = props => {
  const { index, name } = props

  const [lists, setLists] = useContext(GlobalContext)

  const handleConfirm = () => {
    setLists([
      ...lists.slice(0, index),
      ...lists.slice(index + 1)
    ])
  }

  const [renaming, setRenaming] = useState(false)
  const [form] = Form.useForm()

  const handleRename = () => {
    setRenaming(true)
  }

  const handleCancel = () => {
    setRenaming(false)
  }

  const list = lists[index]

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const name = values.name.trim()
        setLists([
          ...lists.slice(0, index),
          {
            ...list,
            name
          },
          ...lists.slice(index + 1)
        ])
        setRenaming(false)
        message.success(`Successfully renamed list to '${name}'`)
      })
      .catch(null)
  }

  return (
    <>
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
          <EditOutlined 
            onClick={handleRename} 
          />,
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
      <Modal
        title={`Rename list '${name}'`}
        visible={renaming}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <RenameForm
          form={form}
          originalName={name}
        />
      </Modal>
    </>
  )
}

export default ListCard
