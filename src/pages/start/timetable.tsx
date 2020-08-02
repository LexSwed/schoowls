import React from 'react'
import { Stack, Flex, Button, Heading } from '@chakra-ui/core'
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'

import Center from '../../components/Center'
import { Timetable } from '../../components/start'

const createTimetableMutation = gql`
  mutation createTimetable($periods: [PeriodInput!]!) {
    createTimetable(periods: $periods) {
      id
      periods {
        id
        duration
        startTime
      }
    }
  }
`

const TimetableStart = () => {
  const [createTimetable] = useMutation(createTimetableMutation)

  const handleNext = async () => {
    const { data } = await createTimetable()

    Router.push('/schedule')
  }

  return (
    <Center bg="gray.50">
      <Stack p={6} px={8} spacing={6}>
        <Heading size="lg" mb={4}>
          Welcome! Let's put your first timetable
        </Heading>
        <Timetable />
        <Flex justifyContent="flex-end" mt={2}>
          <Button onClick={handleNext}>Next</Button>
        </Flex>
      </Stack>
    </Center>
  )
}

export default TimetableStart
