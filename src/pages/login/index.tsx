import React, { useState } from 'react'
import { Box } from '@chakra-ui/core'
import Router from 'next/router'
import styled from '@emotion/styled'

import { AuthResponse } from '../../../api/authorize'
import { LoginForm } from '../../components/login'
import { useIsAuth } from '../../lib'
import Center from '../../components/Center'

const Login = () => {
  const isAuth = useIsAuth()

  if (isAuth) {
    Router.push('/')
  }

  async function handleSuccess({ user, isNewUser }: AuthResponse) {
    if (isNewUser) {
      Router.push('/start')
    } else {
      Router.push('/')
    }
  }

  return (
    <Center>
      <LoginForm onSuccess={handleSuccess} />
    </Center>
  )
}

export default Login
