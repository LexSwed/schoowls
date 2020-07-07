import React from 'react'
import { User } from '@prisma/client'

const CreateAccount: React.FC<{ user: User }> = ({ user }) => {
  console.log(user)
  return <div>Create Account</div>
}

export default CreateAccount
