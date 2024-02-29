import { CurrentProductionStatus } from '@prisma/client'
import { prisma } from '../../configuration'
import { CurrentProductionBody } from './models/current-production'

export async function postHandler(request: Request) {
  let body: CurrentProductionBody

  try {
    body = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { productId, productCount, note } = body

  if (!productId || !productCount) {
    return new Response('Bad Request: Missing request fields', { status: 400 })
  }

  try {
    await prisma.currentProduction.create({
      data: {
        productId: productId,
        productCount: Number(productCount),
        note: note ?? '',
        status: CurrentProductionStatus.WAITING,
        created: Date(),
      },
    })
  } catch (error) {
    console.log('Error creating current production', error)
    return new Response(
      'Internal Server Error: There was an error creating current production',
      {
        status: 500,
      }
    )
  }

  return new Response('Current production created successfully', { status: 200 })
}
