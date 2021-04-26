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

  const list = lists[index]
  const { items } = list

  return (
    <List
      itemLayout='vertical'
      size='large'
      dataSource={items.map(
        (item, index) => [item, index]
      )}
      renderItem={(
        [item, itemIndex]
      ) => {
        const picture = pictures.pictures
          .find(({ 
            id
          }) => id === item.id)
        const handleCheck = (
          { target: { checked } }
        ) => {
          setLists([
            ...lists.slice(0, index),
            {
              ...list,
              items: [
                ...items.slice(
                  0, 
                  itemIndex
                ),
                {
                  ...item,
                  checked
                },
                ...items.slice(
                  itemIndex + 1
                )
              ]
            }
          ])
        }
        return(
          <List.Item
            key={item.id}
            actions={[
              <Checkbox 
                checked={item.checked}
                onChange={handleCheck}
              />
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
