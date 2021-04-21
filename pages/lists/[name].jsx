import { mainTitle, listsTitle } from '../lib/titles'
import Title from '../components/Title'
import { useRouter } from 'next/router'

const ListPage = () => {
  const { query: { name } } = useRouter()

  return (
    <>
      <Title paths={[name, listsTitle, mainTitle]} />
      <h1>List Page Coming Soon</h1>
    </>
  )
}

export default ListPage
