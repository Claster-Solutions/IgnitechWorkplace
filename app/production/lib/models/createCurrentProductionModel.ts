import { CurrentProductionStatus } from "@prisma/client";

export interface CreateCurrentProductionModel {
  productId: string;
  productCount: number;
  note: string;
  status: CurrentProductionStatus;
}
