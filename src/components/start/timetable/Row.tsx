import React from 'react'
import { Input, IconButton } from '@chakra-ui/core'
import { Period, timeToMinutes, formatTime } from './utils'

type Props = Period & { onChange: (startTime: string) => void }

const Row: React.FC<Props> = ({ startTime, duration, onChange, children }) => {
  return (
    <>
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
      {children}
    </>
  )
}

export default Row
