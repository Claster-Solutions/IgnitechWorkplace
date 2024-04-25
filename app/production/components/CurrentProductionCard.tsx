import { ProductionWithRel } from '@/constants'

interface Props {
  data: ProductionWithRel
}

export default function CurrentProductionCard(p: Props) {
  const data = p.data
  return (
    <div className="flex w-full flex-col rounded bg-slate-300 p-4">
      <div className="flex w-full flex-row justify-between">
        <p>{data.product.name}</p>
        <p>{data.product.description}</p>
      </div>
      <p>{data.productCount}</p>
    </div>
  )
}
