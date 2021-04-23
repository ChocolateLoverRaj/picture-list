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
  useState,
  useEffect
} from 'react'
import Link from 'next/link'
import ImageInput from '../../components/ImageInput'

const { TextArea } = Input

const ListPage = () => {
  const { query: { name } } = useRouter()

  const {
    lists: [lists, setLists],
    pictures: [pictures, setPictures]
  } = useContext(GlobalContext)

  const index = lists.findIndex(({ 
    name: currentName 
  }) => currentName === name)

  const list = lists[index]

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

  useEffect(() => {
    try {
    alert(JSON.stringify(list))
    alert(list.length)
    }catch(e){
      alert(e.message)
    }
  }, [list])

  const handleOk = () => {
    form
      .validateFields()
        .then(values => {
          const id = pictures.nextId
          setPictures({
            nextId: id + 1,
            pictures: [
              ...pictures.pictures,
              {
                id,
                values
              }
            ]
          })
          setLists([
            ...lists.slice(0, index),
            {
              ...list,
              items: [
                ...list.items,
                id
              ]
            },
            ...lists.slice(index + 1)
          ])
          form.resetFields()
          setAdding(false)
          alert(JSON.stringify(localStorage.getItem('lists')))
          alert(JSON.stringify(localStorage.getItem('pictures')))
        })
        .catch(null)
  }

  return (
    <>
      <Title paths={[name, listsTitle, mainTitle]} />
      {list !== undefined
        ? (
          <>
            <Statistic
              title='Items'
              value={list.items.length}
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
              onOk={handleOk}
            >
              <Form form={form}>
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
                  <TextArea />
                </Form.Item>
                <Form.Item
                  label='Picture'
                  name='picture'
                  rules={[({ 
                    getFieldValue 
                  }) => ({
                    validator: (_, value) => (
                        getFieldValue('name').trim().length !== 0 ||
                        value !== undefined
                    )
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error(
                          'Items must have a name or a picture!'
                        )
                      )
                  })]}
                >
                  <ImageInput />
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
