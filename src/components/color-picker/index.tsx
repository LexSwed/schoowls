import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Heading,
  Grid,
  Stack,
  PseudoBox,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  SimpleGrid,
} from '@chakra-ui/core'

const ColorPreview = styled(PseudoBox)`
  filter: brightness(1.05);
  transform: scale(0.9);
  &:hover,
  &:focus {
    filter: brightness(1);
    transform: scale(1);
  }
`

const ColorBunk: React.FC<React.ComponentProps<typeof ColorPreview>> = React.forwardRef((props, ref) => (
  <ColorPreview
    cursor="pointer"
    borderRadius="50%"
    size="16px"
    flex="0 0 auto"
    shadow="sm"
    as="button"
    transition="0.2s ease-in-out"
    outline="none"
    _focus={{ boxShadow: 'outline' }}
    _hover={{
      shadow: 'md',
    }}
    {...props}
    ref={ref}
  />
))

type Props = {
  value: string
  onChange: (value: string) => void
}

const colors = ['red', 'blue', 'orange', 'green', 'yellow', 'teal', 'cyan', 'pink']

const ColorPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Popover usePortal>
      <PopoverTrigger>
        <ColorBunk bg={`${value}.400`} />
      </PopoverTrigger>
      <PopoverContent p={2} zIndex={100} width="auto">
        <SimpleGrid spacing={2} alignItems="center" justifyContent="center" columns={4}>
          {colors.map((color) => (
            <ColorBunk bg={`${color}.400`} key={color} size={10} onClick={() => onChange(color)} />
          ))}
        </SimpleGrid>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker
