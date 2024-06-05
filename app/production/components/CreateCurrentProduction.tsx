import useSWRMutation from 'swr/mutation'
import { createCurrentProduction } from '../lib/createCurrentProduction'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import CreateCurrentProductionDropdown, { CreateCurrentProductionDropdownItem } from './CreateCurrentProductionDropdown'
import Notiflix from 'notiflix'
import { CreateCurrentProductionModel } from '../lib/models/createCurrentProductionModel'
import { Product, Status } from '@prisma/client'
import { fetcher } from '@/constants'

export default function CreateCurrentProduction() {
  const { trigger, isMutating } = useSWRMutation('api/production', createCurrentProduction)

  const { data: productsData } = useSWR<Product[]>('/api/products', fetcher)
  const { data: statusesData } = useSWR<Status[]>('/api/statuses', fetcher)

  useEffect(() => {
    if (!productsData || !statusesData) {
      return
    }

    const productsItems: CreateCurrentProductionDropdownItem[] = productsData.map((value) => {
      return {
        id: value.id,
        title: value.name
      } as CreateCurrentProductionDropdownItem
    })

    const statusesItems: CreateCurrentProductionDropdownItem[] = statusesData.map((value) => {
      return {
        id: value.id,
        title: value.name
      } as CreateCurrentProductionDropdownItem
    })

    setProducts(productsItems)
    setStatuses(statusesItems)
  }, [productsData, statusesData])

  const handleOnSave = async () => {
    if (!selectedProduct || !selectedStatus) {
      return
    }

    try {
      const model: CreateCurrentProductionModel = {
        productId: selectedProduct.id,
        statusId: selectedStatus.id,
        productCount: Number(productCount),
        note: note
      }

      const result = await trigger({ currentProductionModel: model })
      switch (result) {
        case true:
          Notiflix.Notify.success('Produkt úspěšně vytvořen')

          setSelectedProduct(null)
          setProductsInputValue('')
          setProductQuery('')

          setSelectedStatus(null)
          setStatusesInputValue('')
          setStatusesQuery('')

          setProductCount('')
          setNote('')
          break
        case false:
          Notiflix.Notify.failure('Error při vytváření produkce')
          break
      }
    } catch (error) {
      Notiflix.Notify.failure(`Error při vytváření produkce: ${error}`)
    }
  }

  const [selectedProduct, setSelectedProduct] = useState<CreateCurrentProductionDropdownItem | null>(null)
  const [products, setProducts] = useState<CreateCurrentProductionDropdownItem[]>([])

  const [productsQuery, setProductQuery] = useState('')
  const [productsInputValue, setProductsInputValue] = useState('')

  const [selectedStatus, setSelectedStatus] = useState<CreateCurrentProductionDropdownItem | null>(null)
  const [statuses, setStatuses] = useState<CreateCurrentProductionDropdownItem[]>([])

  const [statusesQuery, setStatusesQuery] = useState('')
  const [statusesInputValue, setStatusesInputValue] = useState('')

  const [productCount, setProductCount] = useState('')
  const [note, setNote] = useState('')

  return (
    <div className="flex w-1/4 flex-col space-y-6">
      <label className="flex flex-col space-y-1">
        Produkt
        <CreateCurrentProductionDropdown
          items={products}
          setSelectedItem={setSelectedProduct}
          query={productsQuery}
          setQuery={setProductQuery}
          inputValue={productsInputValue}
          setInputValue={setProductsInputValue}
        />
      </label>
      <label className="flex flex-col space-y-1">
        Počet
        <input
          type="text"
          value={productCount}
          onChange={(event) => {
            setProductCount(event.target.value)
          }}
          className="rounded bg-slate-200 p-2"
        />
      </label>
      <label className="flex flex-col space-y-1">
        Status
        <CreateCurrentProductionDropdown
          items={statuses}
          setSelectedItem={setSelectedStatus}
          query={statusesQuery}
          setQuery={setStatusesQuery}
          inputValue={statusesInputValue}
          setInputValue={setStatusesInputValue}
        />
      </label>
      <label className="flex flex-col space-y-1">
        Poznámka
        <textarea
          rows={2}
          value={note}
          onChange={(event) => {
            setNote(event.target.value)
          }}
          className="rounded bg-slate-200 p-2"
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
