import { NextRequest } from 'next/server'
import { getUsers } from './lib/getUsers'
import { deleteUser } from './lib/deleteUser'
import { putUser } from './lib/putUser'
import { postUser } from './lib/postUser'

export const dynamic = 'force-dynamic' // defaults to auto

// GET

export async function GET(request: NextRequest) {
  return getUsers(request)
}

// PUT

export async function PUT(request: NextRequest) {
  return putUser(request)
}

// DELETE

export async function DELETE(request: NextRequest) {
  return deleteUser(request)
}

// POST

export async function POST(request: Request) {
  return postUser(request)
}
