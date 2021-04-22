import { 
  Button,
  Modal,
  Form,
  message
} from 'antd'
import { 
  useContext, 
  useState
} from 'react'
import GlobalContext from '../contexts/Global'
import { useRouter } from 'next/router'
import RenameForm from '../components/RenameForm'

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
        <RenameForm form={form} />
      </Modal>
    </>
  )
}

export default NewList
