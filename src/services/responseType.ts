import type { AxiosResponse } from "axios";

interface AirTableRecord {
  id: string;
  createdTime: string;
}

export interface SectionRecord extends AirTableRecord {
  fields: {
    name: string;
  };
}

export interface MachineRecord extends AirTableRecord {
  fields: {
    name: string;
    section: string[];
  };
}

export interface MasterItemsRecord extends AirTableRecord {
  fields: {
    name: string;
    machine: string[];
  };
}

export interface MasterItemRecord extends AirTableRecord {
  fields: {
    name: string;
    description: string;
    picture: {
      url: string;
    }[];
    code: string;
    stock: number;
    location: string;
    unit: string;
  };
}

export interface StockTransactionRecord extends AirTableRecord {
  fields: {
    id: number;
    item: string[];
    name: string[];
    status: "stock_in" | "stock_out";
    quantity: number;
    createdDate: string;
    qty_in: number;
    qty_out: number;
    machines: string[];
    stock_out_date_only: string;
    item_machine: string;
  };
}

export type GetAirtableSectionResponse = AxiosResponse<{
  records: SectionRecord[];
}>;

export type GetAirtableMachineResponse = AxiosResponse<{
  records: MachineRecord[];
}>;

export type GetAirtableMasterItemResponse = AxiosResponse<{
  records: MasterItemsRecord[];
}>;

export type GetAirtableMasterItemByIdResponse = AxiosResponse<MasterItemRecord>;

export type CreateAirtableStockTransactionResponse = AxiosResponse<StockTransactionRecord>;
