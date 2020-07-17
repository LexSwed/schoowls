import React, { useState } from 'react'
import { Box, Stack, Heading, FormControl, FormLabel, Input, Image } from '@chakra-ui/core'
import { FullsizeContainer } from '../FullsizeContainer'

const Classes: React.FC = () => {
  const [name, setName] = useState('')
  const [teachingClass, setClass] = useState('')

  return (
    <FullsizeContainer>
      <Box width={600}>
        <Stack spacing={16}>
          <Heading>Welcome! Let's fill in some info</Heading>
          <Stack isInline spacing={8} align="center">
            <Stack spacing="m">
              <FormControl>
                <FormLabel htmlFor="full-name">Name</FormLabel>
                <Input
                  id="full-name"
                  name="name"
                  value={name}
                  placeholder="Minerva McGonagall"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="classes">Classes</FormLabel>
                <Input
                  id="classes"
                  name="classs"
                  value={teachingClass}
                  placeholder="Add new class"
                  onChange={(e) => setClass(e.target.value)}
                />
              </FormControl>
            </Stack>
            <Box size="sm">
              <Image src="/images/teaching.svg" alt="Teacher with a board behind" />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </FullsizeContainer>
  )
}

export default Classes
