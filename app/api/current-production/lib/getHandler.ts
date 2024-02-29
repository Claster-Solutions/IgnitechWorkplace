import { CurrentProduction } from '@prisma/client'
import { prisma } from '../../configuration'

export async function getHandler(request: Request) {
  let currentProductions: CurrentProduction[]

  try {
    currentProductions = await prisma.currentProduction.findMany({
      select: {
        id: true,
        product: true,
        productCount: true,
        note: true,
        status: true,
        created: true,
      },
    })
  } catch (error) {
    console.log('Error getting all current productions', error)
    return new Response(
      'Internal Server Error: There was an error getting all current productions',
      { status: 500 }
    )
  }

  currentProductions.sort((a, b) => (a.created > b.created ? -1 : 1))

  return Response.json(currentProductions)
}
