import { NextRequest } from 'next/server'
import { prisma } from '../../client'

export async function deleteHandler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return new Response('Bad Request: Missing user id', {
      status: 400
    })
  }

  try {
    await prisma.user.delete({
      where: {
        id: id
      }
    })

    return new Response('User deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Error deleting user', error)
    return new Response('Internal Server Error: There was an error deleting user', {
      status: 500
    })
  }
}
