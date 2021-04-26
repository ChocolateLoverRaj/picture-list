import { Form, Input, Modal } from "antd";
import ImageInput from "./ImageInput";

const { TextArea } = Input;
const { useForm } = Form;

const ItemModal = (props) => {
  const { onClose, title, onOk, initialValues } = props;

  const [form] = useForm();

  const handleOk = () => {
    form.validateFields().then(onOk).catch(null);
  };

  return (
    <Modal visible title={title} onCancel={onClose} onOk={handleOk}>
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
                getFieldValue("name")?.trim().length !== 0 ||
                value !== undefined
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

export default ItemModal;
