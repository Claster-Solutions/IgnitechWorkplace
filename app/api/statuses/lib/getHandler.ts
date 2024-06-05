import { prisma } from '../../client'
import { StatusWithRel } from '@/constants'

export async function getHandler(request: Request) {
  try {
    const result: StatusWithRel[] = await prisma.status.findMany({
      relationLoadStrategy: 'join',
      include: {
        productions: true
      }
    })

    result.sort((a, b) => (a.name > b.name ? -1 : 1))

    return Response.json(result)
  } catch (error) {
    console.error('Error getting all statuses', error)
    return new Response('Internal Server Error: There was an error getting all statuses', { status: 500 })
  }
}
