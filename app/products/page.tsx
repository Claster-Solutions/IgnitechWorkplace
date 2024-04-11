import Link from 'next/link'
import ProductList from './components/ProductList'
import StatusList from './components/StatusList'

export default function Products() {
  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex w-4/6 flex-row">
        <ProductList />
        <StatusList />
      </div>
      <div className="flex flex-col space-y-2">
        <Link href={'/products/create-product'} className="rounded bg-slate-200 px-4 py-2">
          Create product
        </Link>
        <Link href={'/products/create-status'} className="rounded bg-slate-200 px-4 py-2">
          Create status
        </Link>
      </div>
    </div>
  )
}
