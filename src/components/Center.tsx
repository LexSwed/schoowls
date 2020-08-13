import React from 'react'
import { Box } from '@chakra-ui/core'

const Center: React.FC = ({ children }) => {
  return (
    <Box pt="20vh" display="flex" justifyContent="center">
      {children}
    </Box>
  )
}

export default Center
