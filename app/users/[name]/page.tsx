'use client'

import { useSearchParams } from 'next/navigation'

export default function User({ params }: { params: { name: string } }) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  if (!id) return <div>cant find id</div>

  return (
    <div>
      <p>{params.name}</p>
      <p>{id}</p>
    </div>
  )

  /* const { trigger } = useSWRMutation('/api/users', updateUser)

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
  } */

  {
    /* <div className="flex flex-col space-y-4 w-1/4 items-center">
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
      </div> */
  }
}
