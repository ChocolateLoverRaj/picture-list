import { picturesTitle, mainTitle } from "../lib/titles";
import Title from "../components/Title";
import { Table, Image, Typography, List, Popconfirm } from "antd";
import GlobalContext from "../contexts/Global";
import { useContext } from "react";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const PicturesPage = () => {
  const {
    lists: [lists, setLists],
    pictures: [pictures, setPictures]
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
                renderItem={({ name }) => (
                  <List.Item key={name}>
                    <Link href={`/lists/${name}`}>{name}</Link>
                  </List.Item>
                )}
              />
            )
          },
          {
            title: "Actions",
            render: (picture) => {
              const handleConfirm = () => {
                const listIndexes = lists.map((list) =>
                  list.items.findIndex(({ id }) => id === picture.id)
                );
                if (listIndexes.find((index) => index !== -1) !== undefined) {
                  setLists(
                    lists.map((list, index) =>
                      listIndexes[index] !== -1
                        ? {
                            ...list,
                            items: [
                              ...list.items.slice(0, listIndexes[index]),
                              ...list.items.slice(listIndexes[index] + 1)
                            ]
                          }
                        : list
                    )
                  );
                }
                setPictures({
                  ...pictures,
                  pictures: pictures.pictures.filter(
                    ({ id }) => id !== picture.id
                  )
                });
              };
              return (
                <Popconfirm
                  title="Are you sure you want to delete this picture? Doing so will remove it from all lists that are using it"
                  onConfirm={handleConfirm}
                >
                  <DeleteOutlined />
                </Popconfirm>
              );
            }
          }
        ]}
        dataSource={pictures.pictures}
      />
    </>
  );
};

export default PicturesPage;
