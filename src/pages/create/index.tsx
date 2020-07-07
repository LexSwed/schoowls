import React from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import type { User } from '@prisma/client'

import CreateAccount from './CreateAccount'
import { getCurrentUser } from '../../server/auth/cookie'
import { prisma } from '../../server/db'

const Create: React.FC<{ user: User }> = ({ user }) => {
  if (!user) {
    Router.push('/login')
  }

  if (!user.name) {
    return <CreateAccount user={user} />
  }

  Router.push('/')

  return <div>Create account</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await getCurrentUser(ctx.req)

  const user = await prisma.user.findOne({ where: { email: data.email } })
  return {
    props: {
      user,
    },
  }
}

export default Create
