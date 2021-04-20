import { Button } from 'antd'

const NewList = props => {
  const { onClick } = props

  return (
    <Button 
      type='primary'
      onClick={onClick}
    >
      New List
    </Button>
  )
}

export default NewList
