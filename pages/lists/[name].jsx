import { mainTitle, listsTitle } from "../../lib/titles";
import Title from "../../components/Title";
import { useRouter } from "next/router";
import GlobalContext from "../../contexts/Global";
import { Statistic, Button, Result, PageHeader, Dropdown, Menu } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import Link from "next/link";
import PictureList from "../../components/PictureList";
import ItemAdd from "../../components/ItemAdd";
import ListRename from "../../components/ListRename";
import ListDelete from "../../components/ListDelete";
import ItemAddExisting from "../../components/ItemAddExisting";

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

  const [addingExisting, setAddingExisting] = useState(false);
  const handleAddExisting = () => {
    setAddingExisting(true);
  };
  const handleAddExistingCancel = () => {
    setAddingExisting(false);
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
              <EditOutlined key="edit" onClick={handleRename} />,
              <ListDelete key="delete" index={index} onDelete={handleBack} />
            ]}
          />
          <Statistic title="Items" value={list.items.length} />
          <Dropdown.Button
            type="primary"
            icon={<PlusOutlined />}
            overlay={
              <Menu>
                <Menu.Item onClick={handleAdd}>Create New Item</Menu.Item>
                <Menu.Item onClick={handleAddExisting}>
                  Add Existing Items
                </Menu.Item>
              </Menu>
            }
            onClick={handleAdd}
          >
            Create New Item
          </Dropdown.Button>
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
      {addingExisting && (
        <ItemAddExisting onClose={handleAddExistingCancel} index={index} />
      )}
    </>
  );
};

export default ListPage;
