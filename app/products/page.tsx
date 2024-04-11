'use client'

import CreateProduct from './components/CreateProduct'
import ProductList from './components/ProductList'

export default function Products() {
  return (
    <div className="flex w-full flex-row justify-between">
      <ProductList />
      <CreateProduct />
    </div>
  )
}
