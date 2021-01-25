import { IGenericEntityState } from "@/redux/interfaces";
import { createEntityAdapter } from "@reduxjs/toolkit";

export interface IFanPage {
  id: string;
  name: string;
  members: IMember[];
}

export interface IMember {
  id: string;
  uid: string;
  pageId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}
