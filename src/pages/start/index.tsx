import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box, Heading, FormControl, FormLabel, FormHelperText, Stack, PseudoBox, Input, Flex } from '@chakra-ui/core'

import ColorPicker from '../../components/color-picker'
import Center from '../../components/Center'

const Start: React.FC = () => {
  const [color, setColor] = useState('blue')

  const primaryColor = `${color}.400`

  return (
    <Center bg="#F0F1F6">
      <Box bg="#fff" p={6} px={8} border="1px" borderColor="gray.200" borderRadius="md">
        <Heading size="lg" mb={4}>
          Welcome! What courses you teach?
        </Heading>
        <Stack spacing={4}>
          <Stack borderRadius={8} isInline spacing={4} align="center">
            <FormControl flex="2">
              <FormLabel htmlFor="course-name">Course name</FormLabel>
              <Input variant="flushed" focusBorderColor={primaryColor} placeholder="Physics" />
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
                />
              </FormControl>
            </Box>
            <Flex>
              <ColorPicker value={color} onChange={setColor} />
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}

export default Start
