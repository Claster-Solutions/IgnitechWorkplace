import { prisma } from '../configuration'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  const users = await prisma.user.findMany()
  console.log(users)
  return Response.json(users)
}