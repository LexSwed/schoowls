import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import type { User } from '@prisma/client'
import { Box, Stack, Heading, FormControl, FormLabel, Input } from '@chakra-ui/core'
import styled from '@emotion/styled'

import { getUserFromRequest } from '../../../server/auth'
import { withAuth } from '../../lib/withAuth'
import { FullsizeContainer } from '../../components/FullsizeContainer'

// TODO: move to DB
const dbClasses = ['Math', 'Science', 'Literature', 'Language']

const Image = styled.img`
  height: 200px;
`

const CreatePage: React.FC<{ user: User }> = ({ user }) => {
  const [name, setName] = useState('')
  const [classes, setClasses] = useState([])

  return (
    <FullsizeContainer>
      <Box width={600}>
        <Stack>
          <Heading>Welcome! Let's fill in some info</Heading>
          <Stack isInline spacing={8} align="center">
            <Stack>
              <FormControl>
                <FormLabel htmlFor="full-name">Email</FormLabel>
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
            <Image src="/images/teaching.svg" alt="Teacher with a board behind" />
          </Stack>
        </Stack>
      </Box>
    </FullsizeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx) => {
  try {
    const user = await getUserFromRequest(ctx.req)

    if (user.name) {
      ctx.res.writeHead(302, { Location: '/' })
      ctx.res.end()

      return {
        props: {},
      }
    }

    return {
      props: {
        user,
      },
    }
  } catch (error) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
  }

  return {
    props: {},
  }
})

export default CreatePage
