import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  PseudoBox,
  Input,
  Flex,
  Button,
} from '@chakra-ui/core'

import ColorPicker from '../../components/color-picker'
import Center from '../../components/Center'
import NewCourseEntry from '../../components/new-course-entry'

const emptyCourse = {
  name: '',
  group: '',
  color: 'blue',
}

const Start: React.FC = () => {
  const [courses, updateList] = useState([emptyCourse])

  return (
    <Center bg="#F0F1F6">
      <Stack bg="#fff" p={6} px={8} spacing={4} border="1px" borderColor="gray.200" borderRadius="md">
        <Heading size="lg">Welcome! What courses you teach?</Heading>
        <Stack spacing={4}>
          {courses.map((course, i) => (
            <Box mb={8}>
              <NewCourseEntry
                key={`${course.name}-${i}`}
                course={course}
                onUpdate={(updated) => updateList([...courses.slice(0, i), updated, ...courses.slice(i + 1)])}
              />
            </Box>
          ))}
          <Button
            width="100%"
            size="sm"
            variantColor="blue"
            variant="outline"
            onClick={() => updateList([...courses, emptyCourse])}
          >
            Add another course
          </Button>
        </Stack>
        <Flex alignSelf="flex-end">
          <Button variantColor="blue">Next</Button>
        </Flex>
      </Stack>
    </Center>
  )
}

export default Start
