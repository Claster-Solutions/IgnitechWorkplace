import { CurrentProductionStatus } from "@prisma/client"

export interface CurrentProductionBody {
    id?: string
    productId?: string
    productCount?: string
    note?: string
    status?: CurrentProductionStatus
}
