import React, { useState } from 'react'
import { Box } from '@chakra-ui/core'
import Router from 'next/router'
import styled from '@emotion/styled'

import { AuthResponse } from '../../../api/authorize'
import { LoginForm, Start } from '../../components/login'
import { useIsAuth } from '../../lib'

const Container = styled(Box)`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`

enum Screen {
  login = 'login',
  start = 'start',
}

const Login = () => {
  const [screen, setScreen] = useState(Screen.start)
  const isAuth = useIsAuth()

  if (isAuth) {
    Router.push('/')
  }

  async function handleSuccess({ user, isNewUser }: AuthResponse) {
    if (isNewUser) {
      setScreen(Screen.start)
    } else {
      Router.push('/')
    }
  }

  return (
    <Container>
      {screen === Screen.login ? <LoginForm onSuccess={handleSuccess} /> : screen === Screen.start ? <Start /> : null}
    </Container>
  )
}

export default Login
