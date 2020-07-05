import React from 'react'
import { GetServerSideProps } from 'next'

function HomePage() {
  return <div>Welcome to Next.js!</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx)

  return { props: {} }
}

export default HomePage
