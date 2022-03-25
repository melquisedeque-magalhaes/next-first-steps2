import { GetStaticProps } from "next"

export default function Home({ repositories, data }) {
 
  return (
    <>
      <h1>{data}</h1>
      <ul>{
        repositories.map(repos => (
          <li key={repos}>{repos}</li>
        ))  
      }</ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://api.github.com/users/melquisedeque-magalhaes/repos')

  const data = await response.json()

  const repositoryName = data.map(item => item.name)

  return {
    props: {
      repositories: repositoryName,
      data: new Date().toISOString()
    },
    revalidate: 5 * 60// minutes
  }

}
