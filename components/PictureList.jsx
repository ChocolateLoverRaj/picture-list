import { List, Form, Image, Checkbox, Modal, Space } from "antd";
import GlobalContext from "../contexts/Global";
import { useContext, useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ItemEdit from "./ItemEdit";
import listCount from "../lib/listCount";
import DeletePictureInput from "./DeletePictureInput";

const { useForm } = Form;

const PictureList = (props) => {
  const { index } = props;

  const [editing, setEditing] = useState();

  const {
    lists: [lists, setLists],
    pictures: [pictures, setPictures]
  } = useContext(GlobalContext);

  const list = lists[index];
  const { items } = list;

  const handleEditClose = () => {
    setEditing(undefined);
  };

  const [deleting, setDeleting] = useState();

  const handleDeleteClose = () => {
    setDeleting(undefined);
  };

  const handleDeleteConfirm = () => {
    const deletePicture = form.getFieldValue("deletePicture");
    if (deletePicture) {
      setPictures({
        ...pictures,
        pictures: pictures.pictures.filter(
          ({ id }) => id !== items[deleting].id
        )
      });
      setLists(
        lists.map((list) => ({
          ...list,
          items: list.items.filter(({ id }) => id !== items[deleting].id)
        }))
      );
    } else {
      setLists([
        ...lists.slice(0, index),
        {
          ...list,
          items: [
            ...list.items.slice(0, deleting),
            ...list.items.slice(deleting + 1)
          ]
        },
        ...lists.slice(index + 1)
      ]);
    }
    setDeleting(undefined);
  };

  const [form] = useForm();

  const deletePictureRefs =
    deleting !== undefined && listCount(items[deleting].id, lists);
  const initialValues = deleting !== undefined && {
    deletePicture: deletePictureRefs === 1
  };
  deleting !== undefined && console.log(initialValues);

  // Reset fields when form is closed
  useEffect(() => {
    if (deleting === undefined) form.resetFields();
  }, [deleting, form]);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={items.map((item, index) => [item, index])}
        renderItem={([item, itemIndex]) => {
          const picture = pictures.pictures.find(({ id }) => id === item.id);
          const setItems = (items) => {
            setLists([
              ...lists.slice(0, index),
              {
                ...list,
                items
              },
              ...lists.slice(index + 1)
            ]);
          };
          const handleCheck = ({ target: { checked } }) => {
            setItems([
              ...items.slice(0, itemIndex),
              {
                ...item,
                checked
              },
              ...items.slice(itemIndex + 1)
            ]);
          };
          const handleEdit = () => {
            setEditing(itemIndex);
          };

          const handleDelete = () => {
            setDeleting(itemIndex);
          };
          return (
            <List.Item
              key={item.id}
              actions={[
                <Checkbox checked={item.checked} onChange={handleCheck} />,
                <EditOutlined onClick={handleEdit} />,
                <DeleteOutlined onClick={handleDelete} />
              ]}
              extra={<Image src={picture.picture} />}
            >
              <List.Item.Meta
                title={picture.name}
                description={picture.description}
              />
            </List.Item>
          );
        }}
      />
      {editing !== undefined && (
        <ItemEdit
          onClose={handleEditClose}
          listIndex={index}
          editIndex={editing}
        />
      )}
      {deleting !== undefined && (
        <Modal
          title="Remove Item From List"
          visible
          onCancel={handleDeleteClose}
          onOk={handleDeleteConfirm}
        >
          <Space direction="vertical">
            Are you sure you want to remove the item from the list?
            <Form initialValues={initialValues} form={form}>
              <Form.Item name="deletePicture">
                <DeletePictureInput id={items[deleting].id} />
              </Form.Item>
            </Form>
          </Space>
        </Modal>
      )}
    </>
  );
};

export default PictureList;
