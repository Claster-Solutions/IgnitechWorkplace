import { Prisma } from '@prisma/client'

export const fetcher = (url: string) => fetch(url).then((response) => response.json())

export type UserWithRel = Prisma.UserGetPayload<typeof userWithRel>
export type ProductWithRel = Prisma.ProductGetPayload<typeof productWithRel>
export type StatusWithRel = Prisma.StatusGetPayload<typeof statusWithRel>
export type ProductionWithRel = Prisma.ProductionGetPayload<typeof productionWithRel>
export type ImageWithRel = Prisma.ImageGetPayload<typeof imageWithRel>
export type InvoiceWithRel = Prisma.InvoiceGetPayload<typeof InvoiceWithRel>

const userWithRel = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    products: true,
    productions: true
  }
})

const productWithRel = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    users: true,
    images: true,
    productions: true
  }
})

const statusWithRel = Prisma.validator<Prisma.StatusDefaultArgs>()({
  include: {
    productions: true
  }
})

const productionWithRel = Prisma.validator<Prisma.ProductionDefaultArgs>()({
  include: {
    users: true,
    status: true,
    product: true,
    invoice: true
  }
})

const imageWithRel = Prisma.validator<Prisma.ImageDefaultArgs>()({
  include: {
    products: true
  }
})

const InvoiceWithRel = Prisma.validator<Prisma.InvoiceDefaultArgs>()({
  include: {
    production: true
  }
})
