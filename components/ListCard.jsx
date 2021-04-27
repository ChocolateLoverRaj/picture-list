import GlobalContext from "../contexts/Global";
import { useContext, useState } from "react";
import Link from "next/link";
import { Card, Statistic } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import ListRename from "./ListRename";
import ListDelete from "./ListDelete";

const ListCard = (props) => {
  const { index, name } = props;

  const [lists] = useContext(GlobalContext).lists;

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
          <ListDelete index={index} />
        ]}
      >
        <Statistic title="Items" value={list.items.length} />
      </Card>
      {renaming && <ListRename onClose={handleCancel} index={index} />}
    </>
  );
};

export default ListCard;
