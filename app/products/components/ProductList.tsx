import { fetcher } from '@/constants'
import { Product } from '@prisma/client'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { deleteProduct } from '../lib/deleteProduct'
import Notiflix from 'notiflix'

export default function ProductList() {
  const { trigger, isMutating } = useSWRMutation('/api/products', deleteProduct)
  const { data, isLoading } = useSWR<Product[]>('/api/products', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  })

  const handleOnClickDelete = async (productId: string) => {
    try {
      const result = await trigger({ productId: productId })
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
    <div className="w-2/6 flex flex-col space-y-4">
      {data.map((product) => {
        const name = product.name.toLowerCase()
        return (
          <div className="flex flex-row w-full bg-slate-300 rounded p-4" key={product.id}>
            <div className="w-full flex flex-col space-y-2">
              <p>{product.name}</p>
              <p>{product.description}</p>
            </div>
            <button
              disabled={isMutating}
              onClick={() => {
                handleOnClickDelete(product.id)
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
