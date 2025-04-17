export interface Candidate {
  id: string;
  name: string;
  party: string;
  image: string;
  color?: string;
  description?: string;
  snsList?: {
    type: string;
    url: string;
  }[];
  pledges?: Record<string, string>;
}
