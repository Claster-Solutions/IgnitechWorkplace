import { prisma } from '../../configuration'
import { ProductBody } from './models/product'

export async function postHandler(request: Request) {
  let body: ProductBody

  try {
    body = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { name, description } = body

  if (!name || !description) {
    return new Response('Bad Request: Missing required fields', { status: 400 })
  }

  try {
    await prisma.product.create({
      data: {
        name: name,
        description: description,
      },
    })
  } catch (error) {
    console.log('Error creating user:', error)
    return new Response('Internal Server Error: There was an error creating product', {
      status: 500,
    })
  }

  return new Response('Product created successfully', { status: 200 })
}
