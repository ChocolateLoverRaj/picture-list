import { List, Image, Checkbox, Popconfirm } from "antd";
import GlobalContext from "../contexts/Global";
import { useContext, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ItemEdit from "./ItemEdit";

const PictureList = (props) => {
  const { index } = props;

  const [editing, setEditing] = useState();

  const {
    lists: [lists, setLists],
    pictures: [pictures]
  } = useContext(GlobalContext);

  const list = lists[index];
  const { items } = list;

  const handleClose = () => {
    setEditing(undefined);
  };

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
              }
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
            setItems([
              ...items.slice(0, itemIndex),
              ...items.slice(itemIndex + 1)
            ]);
          };
          return (
            <List.Item
              key={item.id}
              actions={[
                <Checkbox checked={item.checked} onChange={handleCheck} />,
                <EditOutlined onClick={handleEdit} />,
                <Popconfirm
                  title="Are you sure you want to delete this picture?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={handleDelete}
                >
                  <DeleteOutlined />
                </Popconfirm>
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
        <ItemEdit onClose={handleClose} listIndex={index} editIndex={editing} />
      )}
    </>
  );
};

export default PictureList;
