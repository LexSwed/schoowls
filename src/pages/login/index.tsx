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
  const [source] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }

    const source = new URLSearchParams(window.location.search).get('source')
    if (source) {
      Router.replace(window.location.pathname)
    }

    return source
  })

  if (isAuth) {
    Router.push('/')
  }

  async function handleSuccess({ user, isNewUser }: AuthResponse) {
    if (isNewUser) {
      Router.push('/start/timetable')
    } else {
      Router.push(source || '/')
    }
  }

  return (
    <Center>
      <LoginForm onSuccess={handleSuccess} />
    </Center>
  )
}

export default Login
