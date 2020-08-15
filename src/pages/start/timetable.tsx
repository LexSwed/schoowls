import React, { useState } from 'react'
import { Stack, Flex, Button, Heading } from '@chakra-ui/core'
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'

import Center from '../../components/Center'
import { Timetable, createTimetableMutation } from '../../components/start'

const TimetableStart = () => {
  const [createTimetable] = useMutation(createTimetableMutation)
  const [periods, setPeriods] = useState<PeriodInput[]>([])

  const handleNext = async () => {
    const { data, errors } = await createTimetable({
      variables: {
        periods,
      },
    })

    if (data) {
      Router.push('/start/schedule')
    }

    if (errors) {
      console.error(errors)
    }
  }

  return (
    <Center bg="gray.50">
      <Stack p={6} px={8} spacing={6}>
        <Heading size="lg" mb={4}>
          Let's create your first timetable
        </Heading>
        <Timetable periods={periods} onChange={setPeriods} />
        <Flex justifyContent="flex-end" mt={2}>
          <Button onClick={handleNext}>Next</Button>
        </Flex>
      </Stack>
    </Center>
  )
}

export default TimetableStart

type PeriodInput = {
  startTime: string
  duration: number
}
