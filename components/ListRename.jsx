import GlobalContext from "../contexts/Global";
import { useContext } from "react";
import { Form, Modal, message } from "antd";
import RenameForm from "./RenameForm";

const { useForm } = Form;

const ListRename = (props) => {
  const { index, onClose } = props;

  const [lists, setLists] = useContext(GlobalContext).lists;
  const list = lists[index];

  const [form] = useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const name = values.name.trim();
        setLists([
          ...lists.slice(0, index),
          {
            ...list,
            name
          },
          ...lists.slice(index + 1)
        ]);
        onClose();
        message.success(
          `Successfully renamed list '${list.name}' to '${name}'`
        );
      })
      .catch(null);
  };

  return (
    <Modal
      title={`Rename list '${list.name}'`}
      visible
      onCancel={onClose}
      onOk={handleOk}
    >
      <RenameForm form={form} originalName={list.name} />
    </Modal>
  );
};

export default ListRename;
