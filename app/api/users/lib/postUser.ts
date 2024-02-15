import { prisma } from '../../configuration'
import { UserBody } from './models/user'

export async function postUser(request: Request) {
  let res: UserBody

  try {
    res = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { firstName, lastName, email } = res

  if (!firstName || !lastName || !email) {
    console.error('Required fields are missing:', { firstName, lastName, email })
    return new Response('Bad Request: Missing required fields', { status: 400 })
  }

  try {
    await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return new Response('Internal Server Error: There was an error creating user', {
      status: 500,
    })
  }

  return new Response('User created successfully', { status: 200 })
}
