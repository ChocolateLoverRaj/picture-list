import { Modal, Form, Input } from "antd";
import ImageInput from "./ImageInput";
import GlobalContext from "../contexts/Global";
import { useContext } from "react";

const { TextArea } = Input;

const ItemEditor = (props) => {
  const { onClose, listIndex, editIndex } = props;

  const {
    lists: [lists, setLists],
    pictures: [pictures, setPictures]
  } = useContext(GlobalContext);

  const list = lists[listIndex];

  const handleCancel = () => {
    onClose();
  };

  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editIndex !== undefined) {
          setPictures({
            ...pictures,
            pictures: pictures.pictures.map((picture) => {
              if (picture.id === list.items[editIndex].id) {
                return {
                  ...picture,
                  ...values
                };
              }
              return picture;
            })
          });
        } else {
          const id = pictures.nextId;
          setPictures({
            nextId: id + 1,
            pictures: [
              ...pictures.pictures,
              {
                id,
                ...values
              }
            ]
          });
          setLists([
            ...lists.slice(0, listIndex),
            {
              ...list,
              items: [
                ...list.items,
                {
                  id,
                  checked: false
                }
              ]
            },
            ...lists.slice(listIndex + 1)
          ]);
        }
        onClose();
      })
      .catch(null);
  };

  const initialValues =
    editIndex !== undefined
      ? pictures.pictures.find(({ id }) => id === list.items[editIndex].id)
      : undefined;

  return (
    <Modal
      visible
      title={editIndex !== undefined ? "Edit Item" : "Add Item"}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form} initialValues={initialValues}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Coconut Milk" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Picture"
          name="picture"
          rules={[
            ({ getFieldValue }) => ({
              validator: (_, value) =>
                getFieldValue("name").trim().length !== 0 || value !== undefined
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Items must have a name or a picture!")
                    )
            })
          ]}
        >
          <ImageInput />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ItemEditor;
