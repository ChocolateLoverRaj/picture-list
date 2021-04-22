import {
  Form,
  Input
} from 'antd'

const RenameForm = props => {
  const { form, originalName } = props

  return (
    <Form
      form={form}
      initialValues={{
        name: name ?? ''
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
          placeholder='Grocery List' 
        />
      </Form.Item>
    </Form>
  )
}

export default RenameForm
