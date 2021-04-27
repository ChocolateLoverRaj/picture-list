import GlobalContext from "../contexts/Global";
import { useContext } from "react";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ListDelete = (props) => {
  const { index, onDelete } = props;

  const [lists, setLists] = useContext(GlobalContext).lists;

  const handleConfirm = () => {
    setLists([...lists.slice(0, index), ...lists.slice(index + 1)]);
    onDelete?.();
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this list?"
      okText="Yes"
      cancelText="No"
      onConfirm={handleConfirm}
    >
      <DeleteOutlined />
    </Popconfirm>
  );
};

export default ListDelete;
