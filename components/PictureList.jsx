import {
  List,
  Image,
  Checkbox
} from 'antd'
import GlobalContext from '../contexts/Global'
import { useContext } from 'react'

const PictureList = props => {
  const { index } = props

  const {
    lists: [lists, setLists],
    pictures: [pictures]
  } = useContext(GlobalContext)

  const list = lists[i]

  return (
    <List
      itemLayout='vertical'
      size='large'
      dataSource={list.items}
      renderItem={item => {
        const picture = pictures.pictures
          .find(({ 
            id
          }) => id === item.id)
        return(
          <List.Item
            key={item.id}
            actions={[
              <Checkbox />
            ]}
            extra={
              <Image
                src={picture.picture}
              />
            }
          >
            <List.Item.Meta
              title={picture.name}
              description={
                picture.description
              }
            />
          </List.Item>
        )
      }}
    />
  )
}

export default PictureList
