export interface ICampaign {
  id: string;
  name: string;
  createdAt: Date,
  creatorId: string;
  pageId: string;
  totalMessages: number
  successMessages: number
  status: string
}
