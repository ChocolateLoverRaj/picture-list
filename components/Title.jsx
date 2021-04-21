import Head from 'next/head'

const Title = props => {
  const { paths } = props
  
  return (
    <Head>
      <title>{paths.join('\u2022')}</title>
    </Head>
  )
}

export default Title
