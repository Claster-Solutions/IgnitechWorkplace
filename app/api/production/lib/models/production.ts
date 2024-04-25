export interface CreateProductionBody {
  id: string
  statusId: string
  productId: string
  invoiceId: string
  productCount: number
  note?: string
}

export interface PutProductionBody {
  id: string
  statusId?: string
  productCount?: number
  note?: string
}
