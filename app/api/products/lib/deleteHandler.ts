import { NextRequest } from 'next/server'
import { prisma } from '../../client'

export async function deleteHandler(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return new Response('Bad Request: Missing product id', {
      status: 400
    })
  }

  try {
    await prisma.product.delete({
      where: {
        id: id
      }
    })

    return new Response('Product deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Error deleting product', error)
    return new Response('Internal Server Error: There was an error deleting product', {
      status: 500
    })
  }
}
