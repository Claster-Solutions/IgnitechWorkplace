import { NextRequest } from 'next/server'
import { getHandler } from './lib/getHandler'
import { postHandler } from './lib/postHandler'
import { deleteHandler } from './lib/deleteHandler'
import { putHandler } from './lib/putHandler'

export const dynamic = 'force-dynamic' // defaults to auto

// GET

export async function GET(request: Request) {
  return getHandler(request)
}

// POST

export async function POST(request: Request) {
  return postHandler(request)
}

// PUT

export async function PUT(request: Request) {
  return putHandler(request)
}

// DELETE

export async function DELETE(request: NextRequest) {
  return deleteHandler(request)
}
