import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  PseudoBox,
  Input,
  Flex,
  Button,
} from '@chakra-ui/core'
import Center from '../../components/Center'
import Timetable from '../../components/start/Timetable'

const Start: React.FC = () => {
  return (
    <Center bg="gray.50">
      <Stack p={6} px={8} spacing={6}>
        <Heading size="lg">Welcome! Let's put your first timetable</Heading>
        <Timetable />
        <Flex justifyContent="flex-end">
          <Button>Next</Button>
        </Flex>
      </Stack>
    </Center>
  )
}

export default Start
