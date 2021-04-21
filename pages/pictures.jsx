import { picturesTitle, mainTitle } from '../lib/titles'
import Title from '../components/Title'

const PicturesPage = () => {
  return (
    <>
      <Title paths={[picturesTitle, mainTitle]} />
    </>
  )
}

export default PicturesPage
