import { 
  Card, 
  Image,
  Empty,
  Popconfirm
} from 'antd'
import {
  PictureOutlined,
  CameraOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { useState, useRef } from 'react'
import Webcam from 'react-webcam'

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

  const handleCancel = () => {
    setTaking(false)
  }

  const ref = useRef(null)

  const handleTakePhoto = () => {
    try { 
      onChange?.(
      ref.current.getScreenshot()
    )
    } catch (e ) {
      alert(e.message)
    }
    
    setTaking(false)
  }

  return (
    <>
      <Card
        cover={taking
          ? <Webcam audio={false} />
          : value !== undefined
            ? <Image src={value} />
            : (
              <Empty 
                image={<PictureOutlined />}
              >
                No Picture Selected
              </Empty>
            )}
        actions={taking
          ? [
            <CheckOutlined
              onClick={handleTakePhoto}
            />,
            <CloseOutlined
              onClick={handleCancel}
            />
          ]
          : [
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
    </>
  )
}

export default ImageInput
