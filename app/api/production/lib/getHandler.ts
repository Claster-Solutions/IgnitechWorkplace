import { prisma } from '../../client'

export async function getHandler(request: Request) {
  try {
    const result = await prisma.production.findMany({
      relationLoadStrategy: 'join',
      select: {
        id: true,
        status: true,
        productCount: true,
        note: true,
        created: true
      }
    })

    result.sort((a, b) => (a.created > b.created ? -1 : 1))

    console.log(result)

    return Response.json(result)
  } catch (error) {
    console.log('Error getting all current productions', error)
    return new Response('Internal Server Error: There was an error getting all current productions', { status: 500 })
  }
}
