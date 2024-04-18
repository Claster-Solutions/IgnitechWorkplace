import { Prisma } from '@prisma/client'

export const fetcher = (url: string) => fetch(url).then((response) => response.json())

export type CurrentProductionWithProductAndStatus = Prisma.CurrentProductionGetPayload<
  typeof currentProductionWithProductAndStatus
>
export type CurrentProductionWithAll = Prisma.CurrentProductionGetPayload<typeof currentProductionWithAll>

const currentProductionWithProductAndStatus = Prisma.validator<Prisma.CurrentProductionDefaultArgs>()({
  include: {
    product: true,
    status: true
  }
})

const currentProductionWithAll = Prisma.validator<Prisma.CurrentProductionDefaultArgs>()({
  include: {
    product: true,
    status: true,
    users: true
  }
})
