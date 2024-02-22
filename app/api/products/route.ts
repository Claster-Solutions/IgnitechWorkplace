import { getHandler } from './lib/getHandler'
import { postHandler } from './lib/postHandler'

export const dynamic = 'force-dynamic' // defaults to auto

// GET

export async function GET(request: Request) {
  return getHandler(request)
}

// POST

export async function POST(request: Request) {
  return postHandler(request)
}
