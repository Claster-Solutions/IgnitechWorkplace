import { NextRequest } from 'next/server'
import { getHandler } from './lib/getHandler'
import { putHandler } from './lib/putHandler'
import { deleteHandler } from './lib/deleteHandler'
import { postHandler } from './lib/postHandler'

export const dynamic = 'force-dynamic' // defaults to auto

// GET

export async function GET(request: NextRequest) {
  return getHandler(request)
}

// POST

export async function POST(request: Request) {
  return postHandler(request)
}

// PUT

export async function PUT(request: NextRequest) {
  return putHandler(request)
}

// DELETE

export async function DELETE(request: NextRequest) {
  return deleteHandler(request)
}
