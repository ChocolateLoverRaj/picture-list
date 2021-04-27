import { Checkbox, Typography } from "antd";
import GlobalContext from "../contexts/Global";
import { useContext } from "react";
import listCount from "../lib/listCount";

const { Text } = Typography;

const DeletePictureInput = (props) => {
  const { value, onChange, children, id } = props;

  const [lists] = useContext(GlobalContext).lists;

  const handleChange = ({ target: { checked } }) => {
    onChange?.(checked);
  };

  const itemRefs = listCount(id, lists);

  return (
    <>
      <Checkbox checked={value} onChange={handleChange}>
        Delete Picture As Well
      </Checkbox>
      {value && itemRefs > 1 && (
        <>
          <br />
          <Text type="danger">
            Warning: this item will be removed from {itemRefs - 1} other lists!
          </Text>
        </>
      )}
    </>
  );
};

export default DeletePictureInput;
