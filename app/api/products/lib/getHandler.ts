import { ProductWithRel } from '@/constants'
import { prisma } from '../../client'

export async function getHandler(request: Request) {
  try {
    const result: ProductWithRel[] = await prisma.product.findMany({
      relationLoadStrategy: 'join',
      include: {
        productions: true,
        users: true
      }
    })

    result.sort((a, b) => (a.name > b.name ? -1 : 1))

    return Response.json(result)
  } catch (error) {
    console.error('Error getting all products:', error)
    return new Response('Internal Server Error: There was an error getting all products', { status: 500 })
  }
}
