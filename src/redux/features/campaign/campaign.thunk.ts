import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from 'normalizr';

import API from '@/helpers/axios';
import { ICampaign } from "./campaign.model";


const campaignEntity = new schema.Entity('campaigns');
const campaignListSchema = new schema.Array(campaignEntity);

export const getCampaignsAsyncThunk = createAsyncThunk(
  'campaign/get-all-campaigns',
  async (
    _, thunkApi,
  ): Promise<any | ReturnType<typeof thunkApi.rejectWithValue>> => {
    try {
      const response = await API.axios.get('/campaigns');

      const data = normalize<
        any,
        {
          campaigns: { [key: string]: ICampaign }
        }
      >(response.data, campaignListSchema).entities
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
