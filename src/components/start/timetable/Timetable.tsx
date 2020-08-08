import React, { useState, useEffect } from 'react'
import { Stack, FormLabel, Select, Grid } from '@chakra-ui/core'

import Row from './Row'
import { Period, DURATION, minutesToTime, timeToMinutes } from './utils'

const options = ['30', '35', '40', '45', '60', '1:20', '1:25', '1:30'].map((t) => (
  <option key={t} value={t}>
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
      onChange(initialPeriodInputs)
    }
  }, [])

  useEffect(() => {
    onChange(periods.map((p) => ({ ...p, duration })))
  }, [duration])

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
                onChange([...periods.slice(0, i), { ...p, startTime }, ...periods.slice(i + 1)])
              }}
            />
          ))}
        </Grid>
      </Stack>

      <Stack spacing={2}>
        <FormLabel htmlFor="duration">Duration</FormLabel>
        <Select
          id="duration"
          value={minutesToTime(duration)}
          onChange={(e) => setDuration(timeToMinutes(e.target.value))}
        >
          {options}
        </Select>
      </Stack>
    </Grid>
  )
}

export default Timetable
