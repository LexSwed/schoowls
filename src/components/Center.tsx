import React from 'react'
import { Box } from '@chakra-ui/core'

const Center: React.FC<React.ComponentProps<typeof Box>> = ({ children, ...props }) => {
  return (
    <Box pt="15vh" display="flex" minHeight="100vh" justifyContent="center" {...props}>
      {children}
    </Box>
  )
}

export default Center
