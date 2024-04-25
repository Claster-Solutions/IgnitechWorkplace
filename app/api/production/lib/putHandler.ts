import { prisma } from '../../client'
import { PutProductionBody } from './models/production'

export async function putHandler(request: Request) {
  let body: PutProductionBody

  try {
    body = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { id, note, statusId, productCount } = body

  if (!id) {
    return new Response('Bad Request: Missing required fields', { status: 400 })
  }

  try {
    await prisma.production.update({
      where: {
        id: id
      },
      data: {
        note: note,
        statusId: statusId,
        productCount: productCount
      }
    })

    return new Response('Current production updated successfully', { status: 200 })
  } catch (error) {
    console.log('Error creating current production', error)
    return new Response('Internal Server Error: There was an error updating current production', {
      status: 500
    })
  }
}
