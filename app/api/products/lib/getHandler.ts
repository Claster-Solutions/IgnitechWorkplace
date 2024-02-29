import { Product } from '@prisma/client'
import { prisma } from '../../configuration'

export async function getHandler(request: Request) {
  let products: Product[]

  try {
    products = await prisma.product.findMany({
      select: { id: true, name: true, description: true },
    })
  } catch (error) {
    console.error('Error getting all products:', error)
    return new Response(
      'Internal Server Error: There was an error getting all products',
      { status: 500 }
    )
  }

  products.sort((a, b) => (a.name > b.name ? -1 : 1))

  return Response.json(products)
}
