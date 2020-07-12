import React, { useState } from 'react'
import { Box, Stack, Heading, FormControl, FormLabel, Input, Image } from '@chakra-ui/core'
import { FullsizeContainer } from '../FullsizeContainer'

// TODO: move to DB
const dbClasses = ['Math', 'Science', 'Literature', 'Language']

const Classes: React.FC = () => {
  const [name, setName] = useState('')
  const [classes, setClasses] = useState([])

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
              {/* <Select onSelect={(c) => setClasses([...classes, c])}>
                  {dbClasses.map((cl) => (
                    <Option value={cl}>{cl}</Option>
                  ))}
                </Select> */}
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
