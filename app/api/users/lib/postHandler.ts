import { prisma } from '../../client'
import { UserBody } from './models/user'

export async function postHandler(request: Request) {
  let body: UserBody

  try {
    body = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { firstName, lastName, email } = body

  if (!firstName || !lastName || !email) {
    return new Response('Bad Request: Missing required fields', { status: 400 })
  }

  try {
    await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email
      }
    })

    return new Response('User created successfully', { status: 200 })
  } catch (error) {
    console.error('Error creating user:', error)
    return new Response('Internal Server Error: There was an error creating user', {
      status: 500
    })
  }
}
