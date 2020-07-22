import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box, Heading, Grid, Stack, PseudoBox, Input, Flex } from '@chakra-ui/core'

import ColorPicker from '../../components/color-picker'
import Center from '../../components/Center'

const Start: React.FC = () => {
  const [color, setColor] = useState('blue.200')

  return (
    <Center>
      <Stack p={4} spacing={8} border="1px" borderColor="gray.200" borderRadius="md">
        <Heading size="lg">Welcome! Let's build your schedule:</Heading>
        <Grid templateColumns="5fr 3fr" gap={12}>
          <Stack spacing={4}>
            <Stack p={3} pr={6} bg="gray.100" borderRadius={16} isInline spacing={3} align="center">
              <Flex>
                <ColorPicker value={color} onChange={setColor} />
              </Flex>
              <Input aria-label="Course name" variant="flushed" focusBorderColor={color} placeholder="Course name" />
            </Stack>
          </Stack>
          <Box>Timetable</Box>
        </Grid>
      </Stack>
    </Center>
  )
}

export default Start
