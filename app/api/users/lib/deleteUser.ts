import { NextRequest } from 'next/server'
import { prisma } from '../../configuration'

export async function deleteUser(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    console.log('Required parameter is missing:', { id })
    return new Response('Bad request: Missing query parameter', { status: 400 })
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
