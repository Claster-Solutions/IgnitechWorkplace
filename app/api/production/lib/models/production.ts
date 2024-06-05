export interface CreateProductionBody {
  statusId: string
  productId: string
  productCount: number
  note?: string
}

export interface PutProductionBody {
  id: string
  statusId?: string
  productCount?: number
  note?: string
}
