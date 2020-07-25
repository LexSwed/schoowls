import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box, FormControl, FormLabel, Stack, Input, Flex } from '@chakra-ui/core'

import ColorPicker from '../color-picker'

type Props = {
  course: {
    color: string
    name: string
    group: string
  }
  onUpdate: (newCourse: Props['course']) => void
}

const NewCourseEntry: React.FC<Props> = ({ course, onUpdate }) => {
  const { color = 'blue', name = '', group = '' } = course
  const primaryColor = `${color}.400`

  return (
    <Box borderRadius={8}>
      <Stack isInline spacing={4} align="center">
        <FormControl flex="2">
          <FormLabel htmlFor="course-name">Course name</FormLabel>
          <Input
            variant="flushed"
            focusBorderColor={primaryColor}
            placeholder="Physics"
            value={name}
            onChange={(e) => onUpdate({ ...course, name: e.target.value })}
          />
        </FormControl>
        <Box width="7ch">
          <FormControl>
            <FormLabel htmlFor="class-id">Class</FormLabel>
            <Input
              variant="flushed"
              textAlign="center"
              id="class-id"
              placeholder="5-A"
              focusBorderColor={primaryColor}
              value={group}
              onChange={(e) => onUpdate({ ...course, group: e.target.value })}
            />
          </FormControl>
        </Box>
        <Flex>
          <ColorPicker value={color} onChange={(color) => onUpdate({ ...course, color })} />
        </Flex>
      </Stack>
    </Box>
  )
}

export default NewCourseEntry
