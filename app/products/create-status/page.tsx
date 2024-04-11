'use client'

import useSWRMutation from 'swr/mutation'
import { useState } from 'react'
import Notiflix from 'notiflix'
import { createStatus } from '../lib/createStatus'

export default function CreateStatus() {
  const { trigger, isMutating } = useSWRMutation('/api/statuses', createStatus)

  const [name, setName] = useState('')

  const handleOnSave = async () => {
    try {
      const model: CreateStatusModel = {
        name: name
      }

      const result = await trigger({ statusModel: model })
      switch (result) {
        case true:
          Notiflix.Notify.success('Produkt úspěšně vytvořen')
          setName('')
          break
        case false:
          Notiflix.Notify.failure('Error při vytváření statusu')
          break
      }
    } catch (error) {
      Notiflix.Notify.failure(`Error při vytváření statusu: ${error}`)
    }
  }

  return (
    <div className="flex w-1/4 flex-col space-y-6">
      <label className="flex flex-col space-y-1">
        Název
        <input
          type="text"
          value={name}
          className="rounded bg-slate-200 p-2"
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </label>
      <button
        className={`p-2 ${isMutating ? 'bg-slate-100' : 'bg-slate-200'} rounded`}
        disabled={isMutating}
        onClick={() => {
          handleOnSave()
        }}
      >
        Vytvořit
      </button>
    </div>
  )
}
