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

const colors = [
  'red.400',
  'orange.400',
  'blue.400',
  'orange.600',
  'green.400',
  'yellow.500',
  'teal.400',
  'cyan.400',
  'pink.500',
]

const ColorPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Popover usePortal>
      <PopoverTrigger>
        <ColorBunk bg={value} />
      </PopoverTrigger>
      <PopoverContent p={2} zIndex={100} width="auto">
        <SimpleGrid spacing={2} alignItems="center" justifyContent="center" columns={4}>
          {colors.map((color) => (
            <ColorBunk bg={color} key={color} size={10} onClick={() => onChange(color)} />
          ))}
        </SimpleGrid>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker
