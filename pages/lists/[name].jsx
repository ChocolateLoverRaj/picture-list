import { mainTitle, listsTitle } from '../../lib/titles'
import Title from '../../components/Title'
import { useRouter } from 'next/router'
import GlobalContext from '../../contexts/Global'
import {
  Statistic,
  Button,
  Modal,
  Result,
  Form,
  Input
} from 'antd'
import {
  PlusOutlined
} from '@ant-design/icons'
import {
  useContext,
  useState
} from 'react'
import Link from 'next/link'
import Camera from 'react-html5-camera-photo'

const { Textarea } = Input

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

  const [form] = Form.useForm()

  return (
    <>
      <Title paths={[name, listsTitle, mainTitle]} />
      {list !== undefined
        ? (
          <>
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
              <Form
                form={form}
                initialValues={{
                  name: '',
                  description: ''
                }}
              >
                <Form.Item
                  label='Name'
                  name='name'
                >
                  <Input
                    placeholder='Coconut Milk'
                  />
                </Form.Item>
                <Form.Item
                  label='Description'
                  name='description'
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
          </>
        )
        : (
          <Result
            status='404'
            subTitle={`Sorry, a list with the name '${name}' does not exist.`}
            extra={
              <Button
                type='primary'
              >
                <Link href='/lists'>
                  Back to Lists
                </Link>
              </Button>
            }
          />
        )}
    </>
  )
}

export default ListPage
