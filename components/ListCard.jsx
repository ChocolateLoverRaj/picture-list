import GlobalContext from "../contexts/Global";
import { useContext, useState } from "react";
import Link from "next/link";
import { Card, Popconfirm, Statistic } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ListRename from "./ListRename";

const ListCard = (props) => {
  const { index, name } = props;

  const [lists, setLists] = useContext(GlobalContext).lists;

  const handleConfirm = () => {
    setLists([...lists.slice(0, index), ...lists.slice(index + 1)]);
  };

  const [renaming, setRenaming] = useState(false);

  const handleRename = () => {
    setRenaming(true);
  };

  const handleCancel = () => {
    setRenaming(false);
  };

  const list = lists[index];

  return (
    <>
      <Card
        title={name}
        extra={
          <Link href={`/lists/${name}`}>
            <EyeOutlined />
          </Link>
        }
        actions={[
          <EditOutlined onClick={handleRename} />,
          <Popconfirm
            title="Are you sure you want to delete this list?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleConfirm}
          >
            <DeleteOutlined />
          </Popconfirm>
        ]}
      >
        <Statistic title="Items" value={list.items.length} />
      </Card>
      {renaming && <ListRename onClose={handleCancel} index={index} />}
    </>
  );
};

export default ListCard;
