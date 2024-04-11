'use client'

import { fetcher } from '@/constants'
import { User } from '@prisma/client'
import useSWR from 'swr'
import Link from 'next/link'

export default function Users() {
  const { data, isLoading } = useSWR<User[]>('/api/users', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true
  })

  if (isLoading) return <p>loading</p>
  if (!data) return <p>error</p>

  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex w-1/4 flex-col space-y-4">
        {data.map((user) => {
          const name = user.firstName.toLowerCase() + '_' + user.lastName.toLowerCase()
          return (
            <Link href={`/users/${name}?id=${user.id}`} className="w-full" key={user.id}>
              <div className="flex w-full flex-col space-y-2 rounded bg-slate-300 p-4" key={user.id}>
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
                <p>{user.email}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
