import React, { useState } from 'react'
import Router from 'next/router'
import {
  Box,
  Button,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/core'
import { magicLogin } from '../../lib/magicLogin'
import styled from '@emotion/styled'

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
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    errorMessage && setErrorMessage('')

    try {
      const user = await magicLogin(e.currentTarget.email.value)

      if (user?.name) {
        Router.push('/')
      } else {
        Router.push('/create')
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Box p="l" maxW={600}>
        <Stack spacing={4}>
          <Heading as="h2">Sign in with Email</Heading>
          <Stack spacing={2} as="form" onSubmit={handleSubmit}>
            <FormControl isInvalid={Boolean(errorMessage)}>
              <InputGroup>
                <InputLeftElement children={<Icon name="email" color="gray.300" />} />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.doe@email.com"
                  aria-describedby={errorMessage && 'email-helper-text'}
                />
              </InputGroup>
              {errorMessage && (
                <FormHelperText color="red.600" id="email-helper-text">
                  {errorMessage}
                </FormHelperText>
              )}
            </FormControl>
            <LoginButton type="submit" variantColor="cyan" isLoading={loading}>
              Continue
            </LoginButton>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}

export default Login
