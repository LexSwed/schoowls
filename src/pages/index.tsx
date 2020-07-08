import React from 'react'
import { GetServerSideProps } from 'next'
import { withAuth } from '../lib/withAuth'

function HomePage() {
  return <div>Welcome to Next.js!</div>
}

export const getServerSideProps: GetServerSideProps = withAuth(async ({ req, res }) => {
  return {
    props: {},
  }
})

export default HomePage
