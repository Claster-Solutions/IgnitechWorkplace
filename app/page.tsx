'use client'

import { fetcher } from '@/constants'
import { User } from '@prisma/client'
import useSWR from 'swr'

export default function Home() {
  const { data, isLoading } = useSWR<User[]>('/api/users', fetcher)

  if (isLoading) return <p>loading</p>
  if (!data) return <p>error</p>

  return (
    <main className="flex w-full flex-col space-y-4 text-black">
      <div className="w-1/4">
        {data.map((user) => {
          return (
            <div
              className="flex flex-col space-y-2 bg-slate-300 rounded p-4"
              key={user.id}
            >
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{user.email}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}
