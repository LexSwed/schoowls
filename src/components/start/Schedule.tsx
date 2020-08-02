import React from 'react'
import { Heading } from '@chakra-ui/core'

import WeekPlanner from '../week-planner'

const Schedule = () => {
  return (
    <div>
      <Heading mb={4}>Now let's put the schedule</Heading>
      <WeekPlanner />
    </div>
  )
}

export default Schedule
