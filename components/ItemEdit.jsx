import GlobalContext from "../contexts/Global";
import { useContext } from "react";
import ItemModal from "./ItemModal";

const ItemEdit = (props) => {
  const { onClose, listIndex, editIndex } = props;

  const {
    lists: [lists],
    pictures: [pictures, setPictures]
  } = useContext(GlobalContext);

  const list = lists[listIndex];

  const handleOk = (values) => {
    setPictures({
      ...pictures,
      pictures: pictures.pictures.map((picture) => {
        if (picture.id === list.items[editIndex].id) {
          return {
            ...picture,
            ...values
          };
        }
        return picture;
      })
    });
    onClose();
  };

  const initialValues = pictures.pictures.find(
    ({ id }) => id === list.items[editIndex].id
  );

  return (
    <ItemModal
      title="Edit Item"
      onClose={onClose}
      onOk={handleOk}
      initialValues={initialValues}
    />
  );
};

export default ItemEdit;
