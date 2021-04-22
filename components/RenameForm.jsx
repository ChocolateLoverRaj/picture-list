import {
  Form,
  Input
} from 'antd'
import GlobalContext from '../contexts/Global'
import { 
  useContext,
  useRef
} from 'react'

const RenameForm = props => {
  const { form, originalName } = props

  const [lists] = useContext(GlobalContext)
  const ref = useRef(null)

  // Focus on mount
  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <Form
      form={form}
      initialValues={{
        name: originalName ?? ''
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
              return (
                lists.find(({ name }) => name === trimmedName) === undefined ||
                trimmedName === originalName
              )
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
          ref={ref}
          placeholder='Grocery List' 
        />
      </Form.Item>
    </Form>
  )
}

export default RenameForm
