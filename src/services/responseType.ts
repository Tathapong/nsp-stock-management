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
  };
}

export type GetAirtableSectionResponse = AxiosResponse<{
  records: SectionRecord[];
}>;

export type GetAirtableMachineResponse = AxiosResponse<{
  records: MachineRecord[];
}>;
