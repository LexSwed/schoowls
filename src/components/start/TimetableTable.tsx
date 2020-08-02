import React, { useState, useEffect } from 'react'
import type { Period } from '@prisma/client'
import { Box, Heading, Stack, PseudoBox, FormLabel, Select, Input, FormControl, Grid } from '@chakra-ui/core'
import { parse, addMinutes, lightFormat } from 'date-fns'

const options = ['30', '35', '40', '45', '60', '1:20', '1:25', '1:30'].map((t) => (
  <option key={t} value={t}>
    {t}
  </option>
))

const TimetableRow: React.FC<LocalPeriod & { onChange: (startTime: string) => void }> = ({
  startTime,
  endTime,
  onChange,
}) => {
  return (
    <Grid gridTemplateColumns="120px 120px" gridGap={2}>
      <Input
        aria-describedby="start-time"
        name="start-time"
        value={startTime}
        onChange={(e) => onChange(e.target.value)}
        type="time"
        step={300}
      />
      <Input aria-describedby="end-time" name="end-time" value={endTime} isReadOnly type="time" step={300} />
    </Grid>
  )
}

const breakMins = 10
const defaultDuration = 45
const initialTime = '08:30'
const initial: LocalPeriod[] = Array(5)
  .fill(1)
  .reduce((res, _n, i, arr) => {
    if (i === 0) {
      res.push({
        startTime: initialTime,
        endTime: toEndTime(initialTime, defaultDuration),
      })
    } else {
      const startTime = toEndTime(res[i - 1].endTime, breakMins)
      res.push({
        startTime,
        endTime: toEndTime(startTime, defaultDuration),
      })
    }

    return res
  }, [] as LocalPeriod[])

const TimetableTable: React.FC = () => {
  const [duration, setDuration] = useState(defaultDuration)
  const [periods, setPeriods] = useState<LocalPeriod[]>(initial)

  const onDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const duration = toMinutes(e.target.value)
    setDuration(duration)
    setPeriods(updatePeriods(periods, duration))
  }

  return (
    <Grid templateColumns="1fr auto" gap={2} p={2}>
      <Stack direction="column" spacing={2}>
        <Grid display="grid" gridTemplateColumns="120px 120px" gridGap={2}>
          <FormLabel id="start-time">Start time</FormLabel>
          <FormLabel id="end-time">End time</FormLabel>
        </Grid>
        <Grid gridGap={4}>
          {periods.map((p, i) => (
            <TimetableRow
              key={i}
              {...p}
              onChange={(startTime) =>
                setPeriods((periods) => {
                  return [
                    ...periods.slice(0, i),
                    ...updatePeriods([{ startTime, endTime: p.endTime }, ...periods.slice(i + 1)], duration),
                  ]
                })
              }
            />
          ))}
        </Grid>
      </Stack>

      <Stack spacing={2}>
        <FormLabel htmlFor="duration">Duration</FormLabel>
        <Select id="duration" value={toDuration(duration)} onChange={onDurationChange}>
          {options}
        </Select>
      </Stack>
    </Grid>
  )
}

export default TimetableTable

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

// weird stuff
function updatePeriods(periods: LocalPeriod[], duration: number): LocalPeriod[] {
  return periods.map((p, i) => {
    if (i === 0) {
      return {
        startTime: p.startTime,
        endTime: toEndTime(p.startTime, duration),
      }
    }

    const startTime = toEndTime(periods[i - 1].endTime, breakMins)

    return { startTime, endTime: toEndTime(startTime, duration) }
  })
}

type LocalPeriod = {
  startTime: string
  endTime: string
}
