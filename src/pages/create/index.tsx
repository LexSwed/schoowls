import React from 'react'
import { GetServerSideProps } from 'next'
import Router from 'next/router'

import { getUserFromRequest } from '../../../server/auth'
import Classes from '../../components/create/Classes'

type Props = {
  user?: ContextUser
}

const CreatePage: React.FC<Props> = ({ user }) => {
  if (!user) {
    Router.replace('/login')
  } else if (user.name) {
    Router.replace('/')
  }

  return <Classes />
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  try {
    const user = await getUserFromRequest(ctx.req)

    return {
      props: {
        user,
      },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

export default CreatePage
