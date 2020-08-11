import React, { useState, useEffect } from 'react'
import { Stack, FormLabel, Select, Grid } from '@chakra-ui/core'

import Row from './Row'
import { Period, DURATION, timeToMinutes, initialPeriods, shiftPeriods, formatTime } from './utils'

const options = ['30', '35', '40', '45', '60', '1:20', '1:25', '1:30'].map((t) => (
  <option key={t} value={timeToMinutes(t)}>
    {t}
  </option>
))

const Timetable: React.FC<{
  periods: Period[]
  onChange: (periods: Period[]) => void
}> = ({ periods, onChange }) => {
  const [duration, setDuration] = useState(DURATION)

  useEffect(() => {
    if (periods.length === 0) {
      onChange(initialPeriods)
    }
  }, [])

  return (
    <Grid templateColumns="1fr auto" gap={2} p={2}>
      <Stack direction="column" spacing={2}>
        <Grid display="grid" gridTemplateColumns="120px 120px" gridGap={2}>
          <FormLabel id="start-time">Start time</FormLabel>
          <FormLabel id="end-time">End time</FormLabel>
        </Grid>
        <Grid gridGap={4}>
          {periods.map((p, i) => (
            <Row
              key={i}
              {...p}
              onChange={(startTime) => {
                const shifted = shiftPeriods({ ...p, startTime }, i, periods)

                onChange(shifted)
              }}
            />
          ))}
        </Grid>
      </Stack>

      <Stack spacing={2}>
        <FormLabel htmlFor="duration">Duration</FormLabel>
        <Select
          id="duration"
          value={duration}
          onChange={(e) => {
            const newDuration = parseInt(e.target.value, 10)
            const durationDelta = newDuration - duration
            const shifted = periods.map((p, i) => ({
              duration: newDuration,
              startTime: formatTime(timeToMinutes(p.startTime) + durationDelta * i),
            }))

            setDuration(newDuration)
            onChange(shifted)
          }}
        >
          {options}
        </Select>
      </Stack>
    </Grid>
  )
}

export default Timetable
