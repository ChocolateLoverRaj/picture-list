import { mainTitle, listsTitle } from "../../lib/titles";
import Title from "../../components/Title";
import { useRouter } from "next/router";
import GlobalContext from "../../contexts/Global";
import { Statistic, Button, Result } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import Link from "next/link";
import PictureList from "../../components/PictureList";
import ItemAdd from "../../components/ItemAdd";

const ListPage = () => {
  const {
    query: { name }
  } = useRouter();

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

  return (
    <>
      <Title paths={[name, listsTitle, mainTitle]} />
      {list !== undefined ? (
        <>
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
    </>
  );
};

export default ListPage;
