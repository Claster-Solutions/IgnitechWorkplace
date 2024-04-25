import { NextRequest } from 'next/server'
import { prisma } from '../../client'

export async function deleteHandler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return new Response('Bad Request: Missing current production id', {
      status: 400
    })
  }

  try {
    await prisma.production.delete({
      where: {
        id: id
      }
    })

    return new Response('Current production deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Error deleting current production', error)
    return new Response('Internal Server Error: There was an error deleting current production', {
      status: 500
    })
  }
}
