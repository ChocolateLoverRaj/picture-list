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

const NewList = props => {
  const [lists, setLists] = useContext(GlobalContext)
  const [creating, setCreating] = useState(false)
  const [formValue, setFormValue] = useState({ name: '' })

  const handleCreate = () => {
    setCreating(true)
  }

  const handleOk = () => {
    setLists([
      ...lists,
      {
        name: formValue.name,
        items: []
      }
    ])
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
          value={formValue}
          onChange={setFormValue}
        >
          <Form.Item
            label='List Name'
            name='name'
            rules={[{
              required: true,
              message: 'Please enter a name for the list!'
            }]}
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
