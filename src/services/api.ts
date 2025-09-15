// Config
import { airtableInstance } from "../config/axios";

// Type
import * as ResType from "./responseType";

airtableInstance.defaults.baseURL += "appETjyXZJCNk3ItG";

export const getAirtableSection = async () => {
  const tableId = "tblQxwhscbU5iIA3j";
  const url = tableId + "?fields[]=name&sort[0][field]=name&sort[0][direction]=asc";
  const res = (await airtableInstance.get(url)) as ResType.GetAirtableSectionResponse;
  return res.data;
};

export const getAirtableMachines = async (sectionName?: string) => {
  const tableId = "tblq9Jnv8ajAdOr1C";
  let url = tableId;
  if (sectionName) url += `filterByFormula=FIND("${sectionName}",ARRAYJOIN({section},","))`;
  const res = (await airtableInstance.get(url)) as ResType.GetAirtableMachineResponse;
  return res.data;
};
