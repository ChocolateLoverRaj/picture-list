import { picturesTitle, mainTitle } from "../lib/titles";
import Title from "../components/Title";
import { Table, Image, Typography, List } from "antd";
import GlobalContext from "../contexts/Global";
import { useContext } from "react";
import Link from "next/link";

const { Paragraph } = Typography;

const PicturesPage = () => {
  const {
    lists: [lists],
    pictures: [{ pictures }]
  } = useContext(GlobalContext);

  return (
    <>
      <Title paths={[picturesTitle, mainTitle]} />
      <Table
        columns={[
          {
            title: "Name",
            render: (picture) => <>{picture.name}</>
          },
          {
            title: "Description",
            render: (picture) => (
              <Paragraph ellipsis={{ expandable: true, rows: 2 }}>
                {picture.description}
              </Paragraph>
            )
          },
          {
            title: "Picture",
            render: (picture) => <Image height={50} src={picture.picture} />
          },
          {
            title: "Used By",
            render: (picture) => (
              <List
                dataSource={lists.filter(
                  ({ items }) =>
                    items.find(({ id }) => id === picture.id) !== undefined
                )}
                renderItem={(list) => (
                  <List.Item>
                    <Link href="">{list.name}</Link>
                  </List.Item>
                )}
              />
            )
          }
        ]}
        dataSource={pictures}
      />
    </>
  );
};

export default PicturesPage;
