import { 
  Button,
  Modal,
  Form,
  Input,
  message
} from 'antd'
import { 
  useContext, 
  useState
} from 'react'
import GlobalContext from '../contexts/Global'
import { useRouter } from 'next/router'

const { useForm } = Form

const NewList = props => {
  const [lists, setLists] = useContext(GlobalContext)
  const [creating, setCreating] = useState(false)
  const [form] = useForm()
  const router = useRouter()

  const handleCreate = () => {
    setCreating(true)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const name = values.name.trim()
        setLists([
          ...lists,
          {
            name,
            items: []
          }
        ])
        form.resetFields()
        setCreating(false)
        message.success(`Created a list called '${name}'`)
        router.replace(`/lists/${name}`)
      })
      .catch(e => {
        alert(e.message)
      })
  }

  const handleCancel = () => {
    setCreating(false)
  }

  return (
    <>
      <Button 
        type='primary'
        onClick={handleCreate}
      >
        New List
      </Button>
      <Modal 
        title='New List'
        visible={creating}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          initialValues={{
            name: ''
          }}
        >
          <Form.Item
            label='List Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please enter a name for the list!'
              },
              () => ({
                validator: (_, name) => {
                  const trimmedName = name.trim()
                  return lists.find(({ name }) => name === trimmedName) === undefined
                    ? Promise.resolve()
                    : Promise.reject(
                      new Error(
                        'There is already a list with that name!'
                      )
                    )
                }
              })
            ]}
          >
            <Input 
              placeholder='Grocery List' 
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default NewList
