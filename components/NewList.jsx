import { 
  Button,
  Modal,
  Form,
  Input
} from 'antd'
import { 
  useContext, 
  useState
} from 'react'
import GlobalContext from '../contexts/Global'

const { useForm } = Form

const NewList = props => {
  const [lists, setLists] = useContext(GlobalContext)
  const [creating, setCreating] = useState(false)
  const [form] = useForm()

  const handleCreate = () => {
    setCreating(true)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
         setLists([
          ...lists,
          {
            name: values.name.trim(),
            items: []
          }
        ])
      })
      .catch(null)
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
              ({ getFieldValue }) => ({
                validator: (_, value) => (
                  !lists.includes(value.trim())
                    ? Promise.resolve()
                    : Promise.reject(
                      new Error(
                        'There is already a list with that name!'
                      )
                    )
                )
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
