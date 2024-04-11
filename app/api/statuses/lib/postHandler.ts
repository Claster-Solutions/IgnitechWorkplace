import { prisma } from '../../client'
import { StatusBody } from './models/status'

export async function postHandler(request: Request) {
  let body: StatusBody

  try {
    body = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { name } = body

  if (!name) {
    return new Response('Bad Request: Missing required fields', { status: 400 })
  }

  try {
    await prisma.status.create({
      data: {
        name: name
      }
    })

    return new Response('Status created successfully', { status: 200 })
  } catch (error) {
    console.log('Error creating status:', error)
    return new Response('Internal Server Error: There was an error creating status', {
      status: 500
    })
  }
}
