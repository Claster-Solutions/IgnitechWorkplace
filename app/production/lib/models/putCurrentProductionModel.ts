import { CurrentProductionStatus } from "@prisma/client";

export interface PutCurrentProductionModel {
  id: string;
  status: CurrentProductionStatus;
}
