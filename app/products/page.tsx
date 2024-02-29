'use client'

import CreateProduct from './components/CreateProduct'
import ProductList from './components/ProductList'

export default function Products() {
  return (
    <div className="w-full flex flex-row justify-between">
      <ProductList />
      <CreateProduct />
    </div>
  )
}
