export interface VwAssetJobCard {
  id: string;
  workOrderId: string;
  assetId: string;
  jobCardSign: string;
  priorityCode: string;
  prioritySign: string;
  jCIntervalCode: string;
  planTitleSign: string;
  unitSign: string;
  value: string;
  planTitleCode: string;
  mroplanActive?: boolean;
  jobCardId?: string;
  latestJobCardUsage?: string;
  latestJobCardTime?: string;
  remainJcusage: number;
  remainJcday:number;
  row_Num:boolean;
  usageAmount:number;
}