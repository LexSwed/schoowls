import React, { useState } from 'react'
import type { Period } from '@prisma/client'
import { Box, Heading, Stack, PseudoBox, FormLabel, Select, Input, FormControl, Grid } from '@chakra-ui/core'
import { parse, addMinutes, lightFormat } from 'date-fns'

const options = ['30', '35', '40', '45', '60', '1:20', '1:25', '1:30'].map((t) => (
  <option key={t} value={t}>
    {t}
  </option>
))

const TimetableRow: React.FC<LocalPeriod & { onChange: (update: LocalPeriod) => void }> = ({
  startTime,
  duration = 45,
  onChange,
}) => {
  return (
    <PseudoBox display="grid" gridTemplateColumns="1fr 1fr" gridGap={2} _odd={{ bg: 'gray.100' }}>
      <Input
        aria-describedby="start-time"
        name="start-time"
        value={startTime}
        onChange={(e) => onChange({ duration, startTime: e.target.value })}
        type="time"
      />
      <Input
        aria-describedby="end-time"
        name="end-time"
        value={toEndTime(startTime, duration)}
        isReadOnly
        type="time"
      />
    </PseudoBox>
  )
}

const initial: LocalPeriod = { startTime: '08:30', duration: 45 }

const Timetable: React.FC = () => {
  const [periods, setPeriods] = useState<LocalPeriod[]>([initial])
  const [duration, setDuration] = useState(45)

  return (
    <Box>
      <Grid templateColumns="1fr auto" gap={2} p={2}>
        <Stack direction="column" spacing={2}>
          <Grid display="grid" gridTemplateColumns="1fr 1fr" gridGap={2}>
            <FormLabel id="start-time">Start time</FormLabel>
            <FormLabel id="end-time">End time</FormLabel>
          </Grid>
          {periods.map((p, i) => (
            <TimetableRow
              key={i}
              {...p}
              onChange={(update) =>
                setPeriods((periods) => {
                  periods[i] = update

                  return [...periods]
                })
              }
            />
          ))}
        </Stack>

        <Stack spacing={2}>
          <FormLabel htmlFor="duration">Duration</FormLabel>
          <Select id="duration" value={toDuration(duration)} onChange={(e) => setDuration(toMinutes(e.target.value))}>
            {options}
          </Select>
        </Stack>
      </Grid>
    </Box>
  )
}

export default Timetable

type LocalPeriod = Omit<Period, 'id'>

function toDuration(minutes: number): string {
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    return hours > 0 ? `${hours}:${mins}` : `${mins}`
  }

  return `${minutes}`
}

function toMinutes(str: string): number {
  const [hour, minute] = str.split(':')

  if (minute) {
    return parseInt(hour, 10) * 60 + parseInt(minute, 10)
  }

  return parseInt(hour, 10)
}

function toEndTime(startTime: string, duration: number): string {
  const dateTime = parse(startTime, 'HH:mm', 0)

  const endDate = addMinutes(dateTime, duration)

  return lightFormat(endDate, 'HH:mm')
}
