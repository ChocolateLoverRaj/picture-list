import { picturesTitle, mainTitle } from "../lib/titles";
import Title from "../components/Title";
import { Table, Image, Typography } from "antd";
import GlobalContext from "../contexts/Global";
import { useContext } from "react";

const { Paragraph } = Typography;

const PicturesPage = () => {
  const [{ pictures }] = useContext(GlobalContext).pictures;

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
          }
        ]}
        dataSource={pictures}
      />
    </>
  );
};

export default PicturesPage;
