export interface CreateAirtableStockTransactionRequest {
  item: string[];
  status: "stock_in" | "stock_out";
  quantity: number;
  machines: string[];
  createdDate: string;
  section: string[];
}
