import React from 'react'
import { Stack, Flex, Button } from '@chakra-ui/core'
import Center from '../../components/Center'
import SchedulePlanner from '../../components/start/Schedule'

const Schedule: React.FC = () => {
  return (
    <Center bg="gray.50">
      <Stack p={6} px={8} spacing={6}>
        <SchedulePlanner />
        <Flex justifyContent="flex-end" mt={2}>
          <Button onClick={() => console.log('Finish')}>Finish</Button>
        </Flex>
      </Stack>
    </Center>
  )
}

export default Schedule
