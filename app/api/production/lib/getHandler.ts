import { prisma } from '../../client'
import { ProductionWithRel } from '@/constants'

export async function getHandler(request: Request) {
  try {
    const result: ProductionWithRel[] = await prisma.production.findMany({
      relationLoadStrategy: 'join',
      include: {
        product: true,
        status: true,
        users: true
      }
    })

    result.sort((a, b) => (a.created > b.created ? -1 : 1))

    return Response.json(result)
  } catch (error) {
    console.log('Error getting all current productions', error)
    return new Response('Internal Server Error: There was an error getting all current productions', { status: 500 })
  }
}
