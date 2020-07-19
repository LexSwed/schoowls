import React, { useRef, useEffect } from 'react'
import { Grid, Box, Flex } from '@chakra-ui/core'
import styled from '@emotion/styled'

import Header from './Header'
import { useEventListener } from '../../lib'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = [...Array(24).keys()]

const WeekPlanner: React.FC = () => {
  const hoursBoxRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (hoursBoxRef.current) {
      hoursBoxRef.current.children[7].scrollIntoView()
    }
  }, [])

  return (
    <Box width="600px">
      <Header pl="40px" pr={3} />
      <ScrollView height="500px" overflow="scroll" templateColumns="40px repeat(7, 1fr)" pr={1}>
        <Box ref={hoursBoxRef}>
          {hours.map((hour) => (
            <HourIndicator hour={hour} key={`hour-${hour}`} />
          ))}
        </Box>
        {days.map((day) => (
          <DayColumn day={day} key={day} />
        ))}
      </ScrollView>
    </Box>
  )
}

const DayColumn: React.FC<{ day: string }> = ({ day }) => {
  return (
    <Box position="relative">
      {hours.map((hour) => (
        <DayBox height="48px" key={`${day}-${hour}`} />
      ))}
    </Box>
  )
}

export default WeekPlanner

const ScrollView = styled(Grid)`
  &::-webkit-scrollbar {
    background: transparent;
    height: 8px;
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-bottom: 4px solid white;
    border-left: 4px solid white;
    border-right: 4px solid white;
    border-top: 4px solid white;
    border: none;
    box-shadow: none;
    background: #cbd5e0;
    border-radius: 8px;
  }
`

const HourIndicator: React.FC<{ hour: number }> = ({ hour }) => {
  return (
    <Flex flex="0 0 40px" justifyContent="flex-end" alignItems="flex-start" height="48px">
      <Box fontSize={10} pr={2}>{`${hour < 10 ? `0${hour}` : hour}:00`}</Box>
    </Flex>
  )
}

const DayBox = styled(Box)`
  border-right-width: 1px;
  border-bottom-width: 1px;
  &:hover {
    background-color: rgba(160, 174, 192, 0.03);
  }
`
