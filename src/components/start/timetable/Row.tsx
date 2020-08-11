import React from 'react'
import { Input, Grid } from '@chakra-ui/core'
import { Period, timeToMinutes, formatTime } from './utils'

const Row: React.FC<Period & { onChange: (startTime: string) => void }> = ({ startTime, duration, onChange }) => {
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
      <Input
        aria-describedby="end-time"
        name="end-time"
        value={formatTime(timeToMinutes(startTime) + duration)}
        isReadOnly
        type="time"
        step={300}
        tabIndex={-1}
      />
    </Grid>
  )
}

export default Row
