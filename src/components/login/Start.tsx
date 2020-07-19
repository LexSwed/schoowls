import React, { useState } from 'react'
import WeekPlanner from '../week-planner'
import { Grid, Stack, Heading } from '@chakra-ui/core'

const Start: React.FC = () => {
  return (
    <Grid templateColumns="auto 1fr" gap={4}>
      <WeekPlanner />
      <Stack>
        <Heading>Classes</Heading>
      </Stack>
    </Grid>
  )
}

export default Start
