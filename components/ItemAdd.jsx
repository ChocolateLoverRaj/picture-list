import ItemModal from "./ItemModal";
import GlobalContext from "../contexts/Global";
import { useContext } from "react";

const ItemAdd = (props) => {
  const { onClose, index } = props;

  const {
    lists: [lists, setLists],
    pictures: [pictures, setPictures]
  } = useContext(GlobalContext);

  const list = lists[index];

  const handleOk = (values) => {
    const id = pictures.nextId;
    setPictures({
      nextId: id + 1,
      pictures: [
        ...pictures.pictures,
        {
          id,
          ...values
        }
      ]
    });
    setLists([
      ...lists.slice(0, index),
      {
        ...list,
        items: [
          ...list.items,
          {
            id,
            checked: false
          }
        ]
      },
      ...lists.slice(index + 1)
    ]);
    onClose();
  };

  return <ItemModal title="Add Item" onOk={handleOk} onClose={onClose} />;
};

export default ItemAdd;
