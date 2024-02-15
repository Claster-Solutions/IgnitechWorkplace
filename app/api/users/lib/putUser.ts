import { prisma } from '../../configuration'
import { NextRequest } from 'next/server'
import { UserBody } from './models/user'

export async function putUser(request: NextRequest) {
  let res: UserBody

  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  try {
    res = await request.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return new Response('Bad Request: Invalid JSON format', { status: 400 })
  }

  const { firstName, lastName, email } = res

  if (!id) {
    console.log('Required parameter is missing:', { id })
    return new Response('Bad request: Missing query parameter', { status: 400 })
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
