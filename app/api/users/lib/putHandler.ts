import { prisma } from '../../configuration'
import { NextRequest } from 'next/server'
import { UserBody } from './models/user'

export async function putHandler(request: NextRequest) {
  let res: UserBody

  try {
    res = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { id, firstName, lastName, email } = res

  if (!id) {
    return new Response('Bad Request: Missing user id', {
      status: 400,
    })
  }

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    })
  } catch (error) {
    console.error('Error updating user', error)
    return new Response('Internal Server Error: There was an error updating user', {
      status: 500,
    })
  }

  return new Response('User updated successfully', { status: 200 })
}
