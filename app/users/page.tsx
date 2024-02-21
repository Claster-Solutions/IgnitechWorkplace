'use client'

import { fetcher } from '@/constants'
import { User } from '@prisma/client'
import useSWR from 'swr'
import Link from 'next/link'

export default function Users() {
  const { data, isLoading } = useSWR<User[]>('/api/users', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  })

  if (isLoading) return <p>loading</p>
  if (!data) return <p>error</p>

  return (
    <div className="w-full flex flex-row justify-between">
      <div className="w-1/4 flex flex-col space-y-4">
        {data.map((user) => {
          const name = user.firstName.toLowerCase() + '_' + user.lastName.toLowerCase()
          return (
            <Link href={`/users/${name}?id=${user.id}`} className="w-full">
              <div
                className="w-full flex flex-col space-y-2 bg-slate-300 rounded p-4"
                key={user.id}
              >
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
