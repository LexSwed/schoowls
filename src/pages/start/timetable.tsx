import React from 'react'
import { Stack, Flex, Button } from '@chakra-ui/core'
import { gql, useMutation } from '@apollo/client'

import Center from '../../components/Center'
import Timetable from '../../components/start/Timetable'

const createTimetable = gql`
  mutation createTimetable($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`

const TimetableStart = () => {
  return (
    <Center bg="gray.50">
      <Stack p={6} px={8} spacing={6}>
        <Timetable />
        <Flex justifyContent="flex-end" mt={2}>
          <Button>Next</Button>
        </Flex>
      </Stack>
    </Center>
  )
}

export default TimetableStart
