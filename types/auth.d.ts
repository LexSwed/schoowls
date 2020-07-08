declare const User: import('@prisma/client').User
declare const UserDetails: import('@prisma/client').UserDetails

interface UserAuth {
  id: User['id']
  email: User['email']

  details: {
    name: UserDetails['name']
    alias: UserDetails['alias']
    avatarUrl: UserDetails['avatarUrl']
    phoneNumber: UserDetails['phoneNumber']
    timeZone: UserDetails['timeZone']
  }
}
