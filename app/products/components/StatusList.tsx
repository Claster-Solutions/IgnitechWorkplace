'use client'

import { Product } from '@prisma/client'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import Notiflix from 'notiflix'
import { deleteStatus } from '../lib/deleteStatus'
import { fetcher } from '@/constants'

export default function StatusList() {
  const { trigger, isMutating } = useSWRMutation('/api/statuses', deleteStatus)
  const { data, isLoading } = useSWR<Product[]>('/api/statuses', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true
  })

  const handleOnClickDelete = async (statusId: string) => {
    try {
      const result = await trigger({ statusId: statusId })
      switch (result) {
        case true:
          Notiflix.Notify.success('Produkt úspěšně odstraněn')
          break
        case false:
          Notiflix.Notify.failure('Error při odstraňování produktu')
          break
      }
    } catch (error) {
      Notiflix.Notify.failure(`Error při odstraňování produktu: ${error}`)
    }
  }

  if (isLoading) return <p>loading</p>
  if (!data) return <p>error</p>

  return (
    <div className="flex w-full flex-col space-y-4">
      <p>Statusy</p>
      {data.map((status) => {
        return (
          <div className="flex w-full flex-row rounded bg-slate-300 p-4" key={status.id}>
            <div className="flex w-full flex-col space-y-2">
              <p>{status.name}</p>
            </div>
            <button
              disabled={isMutating}
              onClick={() => {
                handleOnClickDelete(status.id)
              }}
            >
              Smazat
            </button>
          </div>
        )
      })}
    </div>
  )
}
