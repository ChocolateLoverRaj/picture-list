import { 
  Card, 
  Image,
  Empty,
  Popconfirm
} from 'antd'
import {
  PictureOutlined,
  CameraOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import Camera from 'react-html5-camera-photo'

const ImageInput = props => {
  const { value, onChange } = props

  const [
    taking, 
    setTaking
  ] = useState(false)

  const handleTake = () => {
    setTaking(true)
  }

  const handleDelete = () => {
    onChange?.(undefined)
  }

  const handleTakePhoto = dataUri => {
    onChange?.(dataUri)
    setTaking(false)
  }

  return (
    <>
      <Card
        cover={value !== undefined
          ? <Image src={value} />
          : (
            <Empty 
              image={<PictureOutlined />}
            >
              No Picture Selected
            </Empty>
          )}
        actions={[
          <CameraOutlined 
            onClick={handleTake}
          />,
          <Popconfirm 
            title='Are you sure you want to delete this picture?'
            onConfirm={handleDelete}
            okText='Yes'
            cancelText='No'
          >
            <DeleteOutlined />
          </Popconfirm>
        ]}
      />
      {taking && (
        <Camera 
          onTakePhoto={handleTakePhoto}
        />
      )}
    </>
  )
}

export default ImageInput
