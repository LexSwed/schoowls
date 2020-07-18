import { NowRequest, NowResponse } from '@vercel/node'
import { prisma } from '../server/db'

export default async function checkEmail(req: NowRequest, res: NowResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const existingUser = await prisma.user.findOne({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
      },
    })

    res.status(200).send(Boolean(existingUser))
  } catch (error) {
    res.status(error.status || 500).end(error.message)
  }
}
