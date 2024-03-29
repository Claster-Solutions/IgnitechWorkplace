import { User } from '@prisma/client'
import { prisma } from '../../configuration'
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
    user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        products: true,
        currentProductions: true,
      },
    })
  } catch (error) {
    console.error('Error getting all users:', error)
    return new Response('Internal Server Error: There was an error getting all users', {
      status: 500,
    })
  }

  return Response.json(user)
}

async function allUsers() {
  let users: User[]

  try {
    users = await prisma.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true },
    })
  } catch (error) {
    console.error('Error getting all users:', error)
    return new Response('Internal Server Error: There was an error getting all users', {
      status: 500,
    })
  }

  users.sort((a, b) => (a.firstName > b.firstName ? -1 : 1))

  return Response.json(users)
}
