import React from 'react'
import { Grid, Box } from '@chakra-ui/core'

const DayHeading: React.FC<React.ComponentProps<typeof Box>> = ({ children, ...props }) => {
  return (
    <Box textTransform="uppercase" textAlign="center" lineHeight={4} color="gray.600" fontSize={12} {...props}>
      {children}
    </Box>
  )
}

const Header: React.FC<React.ComponentProps<typeof Grid>> = (props) => {
  return (
    <Grid
      width="100%"
      as="header"
      templateColumns="repeat(7, 1fr)"
      borderRadius={12}
      mb={2}
      bg="gray.100"
      flex="1 1 100%"
      {...props}
    >
      <DayHeading>Mon</DayHeading>
      <DayHeading>Tue</DayHeading>
      <DayHeading>Wed</DayHeading>
      <DayHeading>Thu</DayHeading>
      <DayHeading>Fri</DayHeading>
      <DayHeading color="gray.400">Sat</DayHeading>
      <DayHeading color="gray.400">Sun</DayHeading>
    </Grid>
  )
}

export default Header
