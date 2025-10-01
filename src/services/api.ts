// Config
import { airtableInstance } from "../config/axios";

// Type
import * as ResType from "./responseType";
import * as ReqType from "./requestType";

airtableInstance.defaults.baseURL += "appETjyXZJCNk3ItG";

export const getAirtableSection = async () => {
  const tableId = "tblQxwhscbU5iIA3j";
  const url = tableId + "?fields[]=name&sort[0][field]=name&sort[0][direction]=asc";
  const res = (await airtableInstance.get(url)) as ResType.GetAirtableSectionResponse;
  return res.data;
};

export const getAirtableMachines = async () => {
  const tableId = "tblq9Jnv8ajAdOr1C";
  let url = tableId;
  url += "?fields[]=name&fields[]=section";
  const res = (await airtableInstance.get(url)) as ResType.GetAirtableMachineResponse;
  return res.data;
};

export const getAirtableMasterItems = async () => {
  const tableId = "tbl8ol60D4lQ0FoDZ";
  let url = tableId;
  url += "?fields[]=name&fields[]=machine";
  const res = (await airtableInstance.get(url)) as ResType.GetAirtableMasterItemResponse;
  return res.data;
};

export const getAirtableMasterItemById = async (recordId: string) => {
  const tableId = "tbl8ol60D4lQ0FoDZ";
  const url = tableId + "/" + recordId;
  const res = (await airtableInstance.get(url)) as ResType.GetAirtableMasterItemByIdResponse;
  return res.data;
};

export const createAirtableStockTransaction = async (data: ReqType.CreateAirtableStockTransactionRequest) => {
  const tableId = "tbl3oWESVOdLvoWnO";
  const res = (await airtableInstance.post(tableId, {
    fields: data,
  })) as ResType.CreateAirtableStockTransactionResponse;
  return res.data;
};
