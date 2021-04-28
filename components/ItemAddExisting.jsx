import { Modal, Table, Avatar } from "antd";
import GlobalContext from "../contexts/Global";
import { useContext, useState } from "react";

const ItemAddExisting = (props) => {
  const { onClose, index } = props;

  const {
    lists: [lists, setLists],
    pictures: [pictures]
  } = useContext(GlobalContext);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const list = lists[index];

  const onOk = () => {
    if (selectedRowKeys.length > 0) {
      setLists([
        ...lists.slice(0, index),
        {
          ...list,
          items: [
            ...list.items,
            ...selectedRowKeys.map((id) => ({
              id,
              checked: false
            }))
          ]
        },
        ...lists.slice(index + 1)
      ]);
    }
    onClose();
  };

  const otherPictures = pictures.pictures.filter(
    ({ id }) => list.items.find((item) => item.id === id) === undefined
  );

  return (
    <Modal title="Add Existing Items" visible onCancel={onClose} onOk={onOk}>
      <Table
        columns={[
          {
            title: "Picture",
            render: ({ picture }) => (
              <>{picture && <Avatar src={picture}>None</Avatar>}</>
            )
          },
          {
            title: "Name",
            render: ({ name }) => <>{name}</>
          }
        ]}
        dataSource={otherPictures}
        rowSelection={{
          selectedRowKeys,
          onChange
        }}
        rowKey="id"
        pagination={{ hideOnSinglePage: true }}
      />
    </Modal>
  );
};

export default ItemAddExisting;
