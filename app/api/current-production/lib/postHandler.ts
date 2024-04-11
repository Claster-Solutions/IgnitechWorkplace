import { prisma } from '../../client'
import { CurrentProductionBody } from './models/current-production'

export async function postHandler(request: Request) {
  let body: CurrentProductionBody

  try {
    body = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { productId, statusId, productCount, note } = body

  if (!productId || !productCount || !statusId) {
    return new Response('Bad Request: Missing request fields', { status: 400 })
  }

  const currentDate = new Date().toISOString()

  try {
    await prisma.currentProduction.create({
      data: {
        productId: productId,
        statusId: statusId,
        productCount: Number(productCount),
        note: note ?? '',
        created: currentDate
      }
    })

    return new Response('Current production created successfully', { status: 200 })
  } catch (error) {
    console.log('Error creating current production', error)
    return new Response('Internal Server Error: There was an error creating current production', {
      status: 500
    })
  }
}
