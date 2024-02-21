import { NextRequest } from 'next/server'
import { prisma } from '../../configuration'
import { UserBody } from './models/user'

export async function deleteUser(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return new Response('Bad Request: Missing user id', {
      status: 400,
    })
  }

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    })
  } catch (error) {
    console.error('Error deleting user', error)
    return new Response('Internal Server Error: There was an error deleting user', {
      status: 500,
    })
  }

  return new Response('User deleted successfully', { status: 200 })
}
