import { User } from '@prisma/client'
import { prisma } from '../../client'
import { NextRequest } from 'next/server'

export async function getHandler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return allUsers()
  }

  return user(id)
}

async function user(id: string) {
  let user: User

  try {
    const result = await prisma.user.findFirst({
      where: {
        id: id
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        products: true,
        productions: true
      }
    })

    return Response.json(result)
  } catch (error) {
    console.error('Error getting all users:', error)
    return new Response('Internal Server Error: There was an error getting all users', {
      status: 500
    })
  }
}

async function allUsers() {
  try {
    const result = await prisma.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true }
    })

    result.sort((a, b) => (a.firstName > b.firstName ? -1 : 1))

    return Response.json(result)
  } catch (error) {
    console.error('Error getting all users:', error)
    return new Response('Internal Server Error: There was an error getting all users', {
      status: 500
    })
  }
}
