import { prisma } from '../../client'
import { CreateProductionBody } from './models/production'

export async function postHandler(request: Request) {
  let body: CreateProductionBody

  try {
    body = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { productId, statusId, invoiceId, productCount, note } = body

  if (!productId || !productCount || !statusId || !invoiceId) {
    return new Response('Bad Request: Missing request fields', { status: 400 })
  }

  try {
    await prisma.production.create({
      data: {
        invoiceId: invoiceId,
        statusId: statusId,
        productId: productId,
        productCount: productCount,
        note: note
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
