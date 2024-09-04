export interface OutboundProject {
  id: number;
  title: string;
  use_case: string;
  company: number;
  campaigns: OutboundCampaign[];
  created: string;
  updated: string;
}

export interface OutboundCampaign {
  id: number;
  project: number;
  title: string;
  start_date: string;
  end_date: string;
  hours: string;
  timezone: string;
  call_limit: number;
  contacts: OutboundContact[];
  created: string;
  updated: string;
  contact_total: number;
  calls_done: number;
  conversion_rate: number;
  cost: number;
  status: string;
  completed_contacts: number;
  failed_contacts: number;
  total_calls: number;
  total_cost: number;
}

export interface OutboundCall {
  id: number;
  call_id: string;
  status: string;
  json_result: Record<string, any>; // Allows any structure for the JSON object
  created: string;
  updated: string;
  contact: number;
}

export interface OutboundContact {
  last_call: any;
  id: number;
  campaign: number;
  phone_number: string;
  created: string;
  updated: string;
  name: string;
  amount: string;
  product: string;
  date: string;
  status: number;
  calls: OutboundCall[];
}