'use client'

import { fetcher } from '@/constants'
import { User } from '@prisma/client'
import { useState } from 'react'
import useSWR from 'swr'
import EditUserInput from './components/EditUserInput'
import useSWRMutation from 'swr/mutation'
import { updateUser } from './lib/updateUser'

export default function Users() {
  const { data, isLoading } = useSWR<User[]>('/api/users', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  })

  const { trigger } = useSWRMutation('/api/users', updateUser)

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleOnSelect = (user: User) => {
    setSelectedUserId(user.id)
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
  }

  const handleOnSave = () => {
    if (!selectedUserId) {
      return
    }

    const body: UpdateUserModel = {
      id: selectedUserId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    }

    setSelectedUserId(null)
    setFirstName('')
    setLastName('')
    setEmail('')

    trigger(body)
  }

  if (isLoading) return <p>loading</p>
  if (!data) return <p>error</p>

  return (
    <div className="w-full flex flex-row justify-between">
      <div className="w-1/4 flex flex-col space-y-4">
        {data.map((user) => {
          return (
            <button
              className="flex flex-col space-y-2 bg-slate-300 rounded p-4"
              onClick={() => {
                handleOnSelect(user)
              }}
              key={user.id}
            >
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{user.email}</p>
            </button>
          )
        })}
      </div>
      <div className="flex flex-col space-y-4 w-1/4 items-center">
        <label className="flex flex-col w-full">
          Jméno
          {EditUserInput(firstName, selectedUserId == null, setFirstName)}
        </label>
        <label className="flex flex-col w-full">
          Příjmení
          {EditUserInput(lastName, selectedUserId == null, setLastName)}
        </label>
        <label className="flex flex-col w-full">
          Email{EditUserInput(email, selectedUserId == null, setEmail)}
        </label>
        <button
          className={`p-2 rounded ${
            selectedUserId == null ? 'bg-slate-200' : 'bg-slate-400'
          }`}
          disabled={selectedUserId == null}
          onClick={() => {
            handleOnSave()
          }}
        >
          Uložit
        </button>
      </div>
    </div>
  )
}
