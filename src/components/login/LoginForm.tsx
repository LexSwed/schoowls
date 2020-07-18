import React, { useState } from 'react'
import {
  Box,
  Button,
  Stack,
  Heading,
  FormControl,
  Input,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  FormLabel,
} from '@chakra-ui/core'
import styled from '@emotion/styled'
import { GoPerson, GoMail } from 'react-icons/go'

import { magicLogin, checkExistingUser } from '../../lib/magicLogin'
import type { AuthResponse } from '../../../api/authorize'

const LoginButton = styled(Button)`
  width: 100%;
`

type Props = {
  onSuccess: (res: AuthResponse) => void
}

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [showNameField, setShowNameField] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    errorMessage && setErrorMessage('')

    try {
      const { email, fullname } = e.currentTarget
      const isExists = await checkExistingUser(email.value)

      if (!isExists && (!fullname || fullname?.value?.length === 0)) {
        setShowNameField(true)
      } else {
        const res = await magicLogin({ email: email.value, name: fullname?.value })

        onSuccess(res)
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack spacing={4}>
      <Heading as="h2">Sign in with Email</Heading>
      <Stack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl isInvalid={Boolean(errorMessage)}>
          <InputGroup>
            <InputLeftElement children={<Box as={GoMail} color="gray.500" />} />
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
        {showNameField && (
          <FormControl isInvalid={Boolean(errorMessage)}>
            <FormLabel htmlFor="fullname">Full name</FormLabel>
            <InputGroup>
              <InputLeftElement children={<Box as={GoPerson} color="gray.500" />} />
              <Input
                id="fullname"
                name="fullname"
                isRequired
                placeholder="Albus Dumbledore"
                aria-describedby="name-helper-text"
              />
            </InputGroup>
            <FormHelperText id="name-helper-text">So that we know how we can call you</FormHelperText>
          </FormControl>
        )}
        <LoginButton type="submit" variantColor="cyan" isLoading={loading}>
          Continue
        </LoginButton>
      </Stack>
    </Stack>
  )
}

export default LoginForm
