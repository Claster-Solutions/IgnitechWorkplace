'use client'

import { fetcher } from '@/constants'
import { Product } from '@prisma/client'
import Link from 'next/link'
import useSWR from 'swr'

export default function Products() {
  const { data, isLoading } = useSWR<Product[]>('/api/products', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  })

  if (isLoading) return <p>loading</p>
  if (!data) return <p>error</p>

  return (
    <div className="w-full flex flex-row justify-between">
      <div className="w-1/4 flex flex-col space-y-4">
        {data.map((product) => {
          const name = product.name.toLowerCase()
          return (
            /* <Link
              href={`/products/${name}?id=${product.id}`}
              className="w-full"
              key={product.id}
            > */
            <div
              className="w-full flex flex-col space-y-2 bg-slate-300 rounded p-4"
              key={product.id}
            >
              <p>{product.name}</p>
              <p>{product.description}</p>
            </div>
            //</Link>
          )
        })}
      </div>
    </div>
  )
}
