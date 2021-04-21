import Title from '../components/Title'
import { 
  Input, 
  Button, 
  Empty
} from 'antd'
import { 
  SearchOutlined,
  CloseCircleFilled
} from '@ant-design/icons'
import useLS from 'use-local-storage'
import NewList from '../components/NewList'
import { useState, useContext } from 'react'
import GlobalContext from '../contexts/Global'
import Link from 'next/link'
import ListCard from '../components/ListCard'
import Fuse from 'fuse.js'
import { mainTitle, listsTitle } from '../lib/titles'

const App = () => {
  const [
    lists, 
    setLists
  ] = useContext(GlobalContext)
  const [
    search, 
    setSearch
  ] = useState('')

  const handleChange = ({ 
    target: { value }
  }) => {
    setSearch(value)
  }

  const handleClear = () => {
    setSearch('')
  }

  const filteredLists = search.trim() !== ''
    ? new Fuse(lists, {
      keys: ['name']
      })
        .search(search)
        .map(({ item }) => item)
    : lists

  return (
    <>
      <Title paths={[listsTitle, mainTitle]} />
      <Input
        prefix={<SearchOutlined />}
        addonAfter={<NewList />}
        allowClear
        placeholder='Filter lists by name'
        value={search}
        onChange={handleChange}
      />
      {lists.length > 0
        ? filteredLists.length > 0
          ? filteredLists.map(({ name }, i) => (
            <ListCard 
              key={name}
              index={i} 
              name={name} 
            />
          ))
          : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={'No lists matched your search'}
            >
              <Button 
                type='dashed' 
                onClick={handleClear}
                icon={<CloseCircleFilled />}
              >
                Clear Filter
              </Button>
              <NewList />
            </Empty>
          )
        : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='No Lists'
          >
            <NewList />
          </Empty>
        )}
    </>
  )
}

export default App
