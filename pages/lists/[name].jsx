import { mainTitle, listsTitle } from "../../lib/titles";
import Title from "../../components/Title";
import { useRouter } from "next/router";
import GlobalContext from "../../contexts/Global";
import { Statistic, Button, Result, PageHeader } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useContext, useState, useRef } from "react";
import Link from "next/link";
import PictureList from "../../components/PictureList";
import ItemAdd from "../../components/ItemAdd";
import ListRename from "../../components/ListRename";
import ListDelete from "../../components/ListDelete";

const ListPage = () => {
  const router = useRouter();
  const {
    query: { name }
  } = router;

  const [lists] = useContext(GlobalContext).lists;

  const index = lists.findIndex(
    ({ name: currentName }) => currentName === name
  );

  const list = lists[index];

  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    setAdding(true);
  };

  const handleClose = () => {
    setAdding(false);
  };

  const [renaming, setRenaming] = useState(false);

  const handleRename = () => {
    setRenaming(true);
  };

  const handleCancel = () => {
    setRenaming(false);
  };

  const handleRenameAfter = (newName) => {
    router.replace(`/lists/${newName}`);
  };

  const handleBack = () => {
    router.replace("/lists");
  };

  return (
    <>
      <Title paths={[name, listsTitle, mainTitle]} />
      {list !== undefined ? (
        <>
          <PageHeader
            title={name}
            onBack={handleBack}
            extra={[
              <EditOutlined onClick={handleRename} />,
              <ListDelete index={index} onDelete={handleBack} />
            ]}
          />
          <Statistic title="Items" value={list.items.length} />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Item
          </Button>
          <PictureList index={index} />
        </>
      ) : (
        <Result
          status="404"
          subTitle={`Sorry, a list with the name '${name}' does not exist.`}
          extra={
            <Button type="primary">
              <Link href="/lists">Back to Lists</Link>
            </Button>
          }
        />
      )}
      {adding && <ItemAdd onClose={handleClose} index={index} />}
      {renaming && (
        <ListRename
          onRename={handleRenameAfter}
          onClose={handleCancel}
          index={index}
        />
      )}
    </>
  );
};

export default ListPage;
