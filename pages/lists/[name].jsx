import { mainTitle, listsTitle } from '../../lib/titles'
import Title from '../../components/Title'
import { useRouter } from 'next/router'
import GlobalContext from '../../contexts/Global'
import {
  Statistic,
  Button,
  Modal
} from 'antd'
import {
  PlusOutlined
} from '@ant-design/icons'
import {
  useContext,
  useState
} from 'react'

const ListPage = () => {
  const { query: { name } } = useRouter()

  const [
    lists, 
    setLists
  ] = useContext(GlobalContext)

  const list = lists.find(({ 
    name: currentName 
  }) => currentName === name)

  const [
    adding, 
    setAdding
  ] = useState(false)

  const handleAdd = () => {
    setAdding(true)
  }

  const handleCancel = () => {
    setAdding(false)
  }

  return (
    <>
      <Title paths={[name, listsTitle, mainTitle]} />
      <Statistic
        title='Items'
        value={list.length}
      />
      <Button
        type='primary'
        icon={<PlusOutlined />}
        onClick={handleAdd}
      >
        Add Item
      </Button>
      <Modal
        visible={adding}
        title='Add Item'
        onCancel={handleCancel}
      >
        Add form coming soon
      </Modal>
    </>
  )
}

export default ListPage
