import React, { useState } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { Box, Card, Heading, TextField, Button, Stack } from '@fxtrot/edge'

import { Magic } from 'magic-sdk'

const Container = styled(Box)`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`

const LoginButton = styled(Button)`
  width: 100%;
`

const Login = () => {
  const [errorMessage, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    event.preventDefault()
    setLoading(true)
    errorMessage && setMessage('')

    const body = {
      email: e.currentTarget.email.value,
    }

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY)
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
      })
      const res = await fetch('/api/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Card elevation="0" p="l">
        <Stack space="l">
          <Heading as="h2">Sign in to your account</Heading>
          <Stack space="m" as="form" onSubmit={handleSubmit}>
            <TextField
              type="email"
              name="email"
              label="Email"
              tone={errorMessage ? 'critical' : undefined}
              message={errorMessage}
            />
            <LoginButton type="submit" loading={loading} variant="brand" size="l">
              Continue
            </LoginButton>
          </Stack>
        </Stack>
      </Card>
    </Container>
  )
}

export default Login
